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

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectURL } from 'ducks/services/selectors';
import * as actions from 'ducks/services/actions';
import { makeSelectURL as makeSelectDeploymentsURL, makeSelectDeploymentsList, } from 'ducks/deployments/selectors';
import { makeSelectURL as makeSelectDaemonSetsURL, makeSelectDaemonSetsList } from 'ducks/daemonSets/selectors';
import { makeSelectURL as makeSelectStatefulSetsURL, makeSelectStatefulSetsList } from 'ducks/statefulSets/selectors';
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
  deployList,
  dsList,
  stsList,
}) => {
  const classes = useStyles();
  useEffect(() => {
    loadDeployments(deployURL, { clusterID, namespaceID });
    loadDaemonSets(dsURL, { clusterID, namespaceID });
    loadStatefulSets(stsURL, { clusterID, namespaceID });
  }, [deployURL, dsURL, stsURL]);
  const initialValues =  fromJS({
    targetResourceType: 'deployments',
    serviceType: 'clusterip',
    exposedPorts: [],
  });

  async function doSubmit(formValues) {
    try {
      const data = formValues.update('exposedPorts', (ports) => (
        ports.filter((p) => p.get('enable'))
      )).toJS();

      await new Promise((resolve, reject) => {
        createService(data, {
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
        title={messages.createPageTitle}
        description={messages.createPageDesc}
      />
      <CssBaseline />
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
              deployments={deployList}
              daemonSets={dsList}
              statefulSets={stsList}
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
  deployList: makeSelectDeploymentsList(),
  dsList: makeSelectDaemonSetsList(),
  stsList: makeSelectStatefulSetsList(),
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
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CreateServicePage);
