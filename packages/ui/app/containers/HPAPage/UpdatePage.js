/**
 *
 * Update Horizontalpodautoscaler Page
 *
 */
import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
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

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import {
  makeSelectURL,
  makeSelectCurrent,
  makeSelectCurrentID,
} from 'ducks/horizontalpodautoscalers/selectors';
import {
  makeSelectDeployments,
  makeSelectURL as makeDeploymentsURL,
} from 'ducks/deployments/selectors';
import {
  makeSelectStatefulSets,
  makeSelectURL as makeSelectStatefulSetsURL,
} from 'ducks/statefulSets/selectors';
import * as actions from 'ducks/horizontalpodautoscalers/actions';
import * as stActions from 'ducks/statefulSets/actions';
import * as dActions from 'ducks/deployments/actions';

import messages from './messages';
import useStyles from './styles';
import UpdateHPAForm, { formName } from './CreateForm';

export const UpdateHPAPage = ({
  updateHorizontalpodautoscaler,
  readHorizontalpodautoscaler,
  submitForm,
  url,
  clusterID,
  namespaceID,
  id,
  current,
  values,
  loadDeployments,
  loadStatefulSets,
  stUrl,
  deployUrl,
  deployments,
  statefulsets,
}) => {
  const classes = useStyles();
  const push = usePush();
  useEffect(() => {
    if (deployUrl) {
      loadDeployments(deployUrl, {
        clusterID,
        namespaceID,
      });
    }
    return () => {};
  }, [clusterID, namespaceID, deployUrl, loadDeployments]);

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
    if (current.size === 0) {
      readHorizontalpodautoscaler(id, {
        url: `${url}/${id}`,
        clusterID,
        namespaceID,
      });
    }
    return () => {
      // cancel someThing
    };
  }, [
    clusterID,
    namespaceID,
    id,
    current.size,
    readHorizontalpodautoscaler,
    url,
  ]);

  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();

      await new Promise((resolve, reject) => {
        updateHorizontalpodautoscaler(data, {
          resolve,
          reject,
          url,
          clusterID,
          namespaceID,
        });
      });
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  return (
    <div className={classes.root}>
      <Helmet
        title={messages.updatePageTitle}
        description={messages.updatePageDesc}
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
              name: <FormattedMessage {...messages.updatePageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            {current.size === 0 ? null : (
              <UpdateHPAForm
                onSubmit={doSubmit}
                formValues={values}
                initialValues={current}
                deployments={deployments}
                statefulsets={statefulsets}
                type="update"
              />
            )}
            <Button variant="contained" color="primary" onClick={submitForm}>
              <FormattedMessage {...messages.update} />
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
  current: makeSelectCurrent(),
  id: makeSelectCurrentID(),
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
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(UpdateHPAPage);
