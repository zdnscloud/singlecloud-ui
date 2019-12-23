/**
 *
 * Create Horizontalpodautoscaler Page
 *
 */
import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS, Map } from 'immutable';
import {
  reduxForm,
  getFormValues,
  SubmissionError,
  submit,
} from 'redux-form/immutable';

import { usePush } from 'hooks/router';

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import {
  makeSelectCurrentID as makeSelectClusterID,
  makeSelectCurrent as makeSelectCurrentCluster,
} from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectURL } from 'ducks/horizontalPodAutoscalers/selectors';
import {
  makeSelectDeployments,
  makeSelectURL as makeDeploymentsURL,
} from 'ducks/deployments/selectors';
import {
  makeSelectStatefulSets,
  makeSelectURL as makeSelectStatefulSetsURL,
} from 'ducks/statefulSets/selectors';
import * as actions from 'ducks/horizontalPodAutoscalers/actions';
import * as stActions from 'ducks/statefulSets/actions';
import * as dActions from 'ducks/deployments/actions';
import * as mActions from 'ducks/metrics/actions';

import messages from './messages';
import useStyles from './styles';
import CreateHPAForm, { formName } from './CreateForm';

export const CreateHPAPage = ({
  createHorizontalPodAutoscaler,
  submitForm,
  url,
  clusterID,
  namespaceID,
  values,
  loadDeployments,
  loadStatefulSets,
  loadMetrics,
  stUrl,
  deployUrl,
  deployments,
  statefulsets,
}) => {
  const classes = useStyles();
  const push = usePush();
  const scaleTargetKind = values && values.get('scaleTargetKind');
  const scaleTargetName = values && values.get('scaleTargetName');
  const [metrics, setMetrics] = useState(Map({}));
  // console.log('deployments', deployments.toJS());

  useEffect(() => {
    if (deployUrl) {
      loadDeployments(deployUrl, {
        clusterID,
        namespaceID,
      });
    }
    return () => {};
  }, [clusterID, loadDeployments, namespaceID, deployUrl]);

  useEffect(() => {
    if (stUrl) {
      loadStatefulSets(stUrl, {
        clusterID,
        namespaceID,
      });
    }
    return () => {};
  }, [clusterID, loadStatefulSets, namespaceID, stUrl]);

  useEffect(() => {
    if (scaleTargetKind && scaleTargetName) {
      let metricsUrl = '';
      switch (scaleTargetKind) {
        case 'deployment':
          metricsUrl = deployments.getIn([scaleTargetName, 'links', 'metrics']);
          break;
        case 'statefulset':
          metricsUrl = statefulsets.getIn([
            scaleTargetName,
            'links',
            'metrics',
          ]);
          break;
        default:
          break;
      }
      loadMetrics(metricsUrl, {
        clusterID,
        namespaceID,
        scaleTargetName,
        resolve({ response }) {
          console.log(response);
          setMetrics(fromJS(response.data));
        },
        reject() {},
      });
    }
    return () => {};
  }, [
    clusterID,
    namespaceID,
    loadMetrics,
    scaleTargetKind,
    scaleTargetName,
    deployments,
    statefulsets,
  ]);

  async function doSubmit(formValues) {
    try {
      const { metrics, ...formData } = formValues.toJS();
      console.log('formValues.toJS()', formValues.toJS());

      const resourceMetrics =
        metrics.filter((r) => r.metricsType === 'resourceMetrics') || [];
      const customMetrics =
        metrics.filter((r) => r.metricsType === 'customMetrics') || [];
      if (resourceMetrics.length > 0) {
        resourceMetrics.forEach((item) => {
          if (item.resourceName === 'memory' && item.averageValue) {
            item.averageValue = `${item.averageValue}Gi`;
          }
        });
      }
      const data = {
        resourceMetrics,
        customMetrics,
        ...formData,
      };
      delete data.metrics;
      delete data.metricsType;
      console.log('data', data);

      // await new Promise((resolve, reject) => {
      //   createHorizontalPodAutoscaler(data, {
      //     resolve,
      //     reject,
      //     url,
      //     clusterID,
      //     namespaceID,
      //   });
      // });
      // push(`/clusters/${clusterID}/namespaces/${namespaceID}/hpa`);
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  return (
    <div className={classes.root}>
      <Helmet
        title={messages.createPageTitle}
        description={messages.createPageDesc}
      />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/hpa`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.createPageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <CreateHPAForm
              onSubmit={doSubmit}
              formValues={values}
              initialValues={fromJS({
                metricsType: 'resourceMetrics',
                metrics: [],
              })}
              deployments={deployments}
              statefulsets={statefulsets}
              metrics={metrics}
            />

            <Button variant="contained" color="primary" onClick={submitForm}>
              <FormattedMessage {...messages.save} />
            </Button>
            <Button
              variant="contained"
              className={classes.cancleBtn}
              onClick={() => {
                push(`/clusters/${clusterID}/namespaces/${namespaceID}/hpa`);
              }}
            >
              <FormattedMessage {...messages.cancle} />
            </Button>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  url: makeSelectURL(),
  values: getFormValues(formName),
  stUrl: makeSelectStatefulSetsURL(),
  deployUrl: makeDeploymentsURL(),
  deployments: makeSelectDeployments(),
  statefulsets: makeSelectStatefulSets(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadDeployments: dActions.loadDeployments,
      loadStatefulSets: stActions.loadStatefulSets,
      loadMetrics: mActions.loadMetrics,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CreateHPAPage);
