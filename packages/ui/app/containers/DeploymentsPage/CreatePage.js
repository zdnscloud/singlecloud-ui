/**
 *
 * Create Deployment Page
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
import { push } from 'connected-react-router';

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import ConfirmDialog from 'components/Confirm/ConfirmDialog';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectCurrentCluster } from 'ducks/clusters/selectors';
import * as sActions from 'ducks/secrets/actions';
import {
  makeSelectSecrets,
  makeSelectURL as makeSelectSecretURL,
} from 'ducks/secrets/selectors';
import * as cActions from 'ducks/configMaps/actions';
import {
  makeSelectConfigMaps,
  makeSelectURL as makeSelectConfigMapURL,
} from 'ducks/configMaps/selectors';
import { makeSelectCurrentStorageClasses } from 'ducks/storages/selectors';
import * as storagesAction from 'ducks/storages/actions';
import { makeSelectURL } from 'ducks/deployments/selectors';
import * as actions from 'ducks/deployments/actions';

import messages from './messages';
import useStyles from './styles';
import DeploymentForm from './CreateForm';

export const formName = 'createDeploymentForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const CreateDeploymentForm = reduxForm({
  form: formName,
  validate,
})(DeploymentForm);

/* eslint-disable react/prefer-stateless-function */
export const CreateDeployment = ({
  clusterID,
  namespaceID,
  cluster,
  configMapURL,
  loadConfigMaps,
  secretURL,
  loadSecrets,
  loadStorageClasses,
  createDeployment,
  submitForm,
  url,
  configMaps,
  secrets,
  storageClasses,
  values,
  routeTo,
}) => {
  const classes = useStyles();
  useEffect(() => {
    loadStorageClasses(cluster.getIn(['links', 'storageclasses']), clusterID);
  }, [clusterID]);
  useEffect(() => {
    loadConfigMaps({ url: configMapURL, clusterID, namespaceID });
    loadSecrets({ url: secretURL, clusterID, namespaceID });
  }, [clusterID, namespaceID]);
  const [open, setOpen] = useState(false);

  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();
      const { persistentVolumes } = data;
      persistentVolumes.forEach((item)=>{
        if (item && item.size) {
          item.size = `${item.size}Gi`;
        }
      });
      const { response } = await new Promise((resolve, reject) => {
        createDeployment(data, {
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
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <ConfirmDialog
        open={!!open}
        onClose={() => {
          routeTo(`/clusters/${clusterID}/namespaces/${namespaceID}/deployments`);
        }}
        onAction={() => {
          routeTo(`/clusters/${clusterID}/namespaces/${namespaceID}/services/create?from=true&targetResourceType=deployments&TargetName=${open}`);
        }}
        title={<FormattedMessage {...messages.successTitle} />}
        content={<FormattedMessage {...messages.successContent} />}
      />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/deployments`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.createDeployment} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <CreateDeploymentForm
              classes={classes}
              onSubmit={doSubmit}
              configMaps={configMaps}
              secrets={secrets}
              storageClasses={storageClasses}
              initialValues={fromJS({
                replicas: 1,
                containers: [{ name: '',exposedPorts:[]}],
                persistentVolumes:[],
                advancedOptions: {}
              })}
              formValues={values}
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
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  cluster: makeSelectCurrentCluster(),
  url: makeSelectURL(),
  configMapURL: makeSelectConfigMapURL(),
  configMaps: makeSelectConfigMaps(),
  secretURL: makeSelectSecretURL(),
  secrets: makeSelectSecrets(),
  storageClasses: makeSelectCurrentStorageClasses(),
  values: getFormValues(formName),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadConfigMaps: cActions.loadConfigMaps,
      loadSecrets: sActions.loadSecrets,
      loadStorageClasses: storagesAction.loadStorageClasses,
      submitForm: () => submit(formName),
      routeTo: push,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
)(CreateDeployment);
