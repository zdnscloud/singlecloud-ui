/**
 *
 * Create Service Page
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
  change,
} from 'redux-form/immutable';
import { push } from 'connected-react-router';

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import ConfirmDialog from 'components/Confirm/ConfirmDialog';

import { makeSelectLocation } from 'ducks/app/selectors';
import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectURL } from 'ducks/services/selectors';
import * as actions from 'ducks/services/actions';
import {
  makeSelectURL as makeSelectDeploymentsURL,
  makeSelectDeployments,
} from 'ducks/deployments/selectors';
import {
  makeSelectURL as makeSelectDaemonSetsURL,
  makeSelectDaemonSets,
} from 'ducks/daemonSets/selectors';
import {
  makeSelectURL as makeSelectStatefulSetsURL,
  makeSelectStatefulSets,
} from 'ducks/statefulSets/selectors';
import * as deployActions from 'ducks/deployments/actions';
import * as dsActions from 'ducks/daemonSets/actions';
import * as stsActions from 'ducks/statefulSets/actions';

import messages from './messages';
import useStyles from './styles';
import CreateServiceForm, { formName } from './CreateForm';

export const CreateServicePage = ({
  createService,
  submitForm,
  changeFormValue,
  url,
  clusterID,
  namespaceID,
  values,
  deployURL,
  dsURL,
  stsURL,
  loadDeployments,
  loadDaemonSets,
  loadStatefulSets,
  deployments,
  daemonSets,
  statefulSets,
  location,
  routeTo,
}) => {
  const classes = useStyles();
  const search = location.get('search');
  let from = false;
  let targetResourceType = '';
  let targetName = '';
  if (search && search.includes('from=true')) {
    const [trt, type] = /targetResourceType=([a-zA-Z]+)/i.exec(search);
    const [tn, name] = /targetName=([a-zA-Z0-9-]+)/i.exec(search);
    from = true;
    targetResourceType = type;
    targetName = name;
  }
  useEffect(() => {
    loadDeployments(deployURL, { clusterID, namespaceID });
    loadDaemonSets(dsURL, { clusterID, namespaceID });
    loadStatefulSets(stsURL, { clusterID, namespaceID });
  }, [
    clusterID,
    deployURL,
    dsURL,
    loadDaemonSets,
    loadDeployments,
    loadStatefulSets,
    namespaceID,
    stsURL,
  ]);
  let exposedPorts = [];
  if (from) {
    let l = fromJS({});
    if (targetResourceType === 'deployments') l = deployments;
    if (targetResourceType === 'daemonSets') l = daemonSets;
    if (targetResourceType === 'statefulSets') l = statefulSets;
    const target = l.get(targetName);
    if (target) {
      exposedPorts = target
        .get('containers')
        .reduce(
          (meno, c) => meno.concat(c.get('exposedPorts') || fromJS([])),
          fromJS([])
        )
        .map((exposedPort) =>
          exposedPort.set('targetPort', exposedPort.get('port'))
        )
        .toJS();
    }
  }
  const initialValues = fromJS({
    targetResourceType: from ? targetResourceType : 'deployments',
    targetName: from ? targetName : '',
    name: from ? targetName : '',
    serviceType: 'clusterip',
    exposedPorts,
  });

  const [open, setOpen] = useState(false);
  async function doSubmit(formValues) {
    try {
      const data = formValues
        .update('exposedPorts', (ports) => ports.filter((p) => p.get('enable')))
        .toJS();

      const { response } = await new Promise((resolve, reject) => {
        createService(data, {
          resolve,
          reject,
          url,
          clusterID,
          namespaceID,
        });
      });
      setOpen(response.name);
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
      <ConfirmDialog
        open={!!open}
        onClose={() => {
          routeTo(`/clusters/${clusterID}/namespaces/${namespaceID}/services`);
        }}
        onAction={() => {
          routeTo(
            `/clusters/${clusterID}/namespaces/${namespaceID}/ingresses/create?from=true&targetResourceType=services&targetName=${open}`
          );
        }}
        title={<FormattedMessage {...messages.successTitle} />}
        content={<FormattedMessage {...messages.successContent} />}
      />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/services`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.createPageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <CreateServiceForm
              onSubmit={doSubmit}
              formValues={values || initialValues}
              initialValues={initialValues}
              deployments={deployments.toList()}
              daemonSets={daemonSets.toList()}
              statefulSets={statefulSets.toList()}
              changeFormValue={changeFormValue}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={submitForm}
            >
              <FormattedMessage {...messages.save} />
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
  deployURL: makeSelectDeploymentsURL(),
  dsURL: makeSelectDaemonSetsURL(),
  stsURL: makeSelectStatefulSetsURL(),
  deployments: makeSelectDeployments(),
  daemonSets: makeSelectDaemonSets(),
  statefulSets: makeSelectStatefulSets(),
  location: makeSelectLocation(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadDeployments: deployActions.loadDeployments,
      loadDaemonSets: dsActions.loadDaemonSets,
      loadStatefulSets: stsActions.loadStatefulSets,
      changeFormValue: (...args) => change(formName, ...args),
      submitForm: () => submit(formName),
      routeTo: push,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CreateServicePage);
