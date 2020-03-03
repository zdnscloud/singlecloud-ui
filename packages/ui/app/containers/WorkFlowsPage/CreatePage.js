/**
 *
 * Create workFlow Page
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
import parseCmd from '@gsmlg/utils/parseCmd';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';

import * as sActions from 'ducks/secrets/actions';
import {
  makeSelectSecrets,
  makeSelectURL as makeSelectSecretURL,
} from 'ducks/secrets/selectors';
import * as cActions from 'ducks/configMaps/actions';
import * as pActions from 'ducks/persistentVolumeClaims/actions';
import {
  makeSelectConfigMaps,
  makeSelectURL as makeSelectConfigMapURL,
} from 'ducks/configMaps/selectors';
import {
  makeSelectStorageClasses,
  makeSelectURL as makeSelectStorageClassesURL,
} from 'ducks/storageClasses/selectors';
import {
  makeSelectPersistentVolumeClaims,
  makeSelectURL as makeSelectPvcURL,
} from 'ducks/persistentVolumeClaims/selectors';
import * as storagesAction from 'ducks/storageClasses/actions';
import { makeSelectURL } from 'ducks/workFlows/selectors';
import * as actions from 'ducks/workFlows/actions';

import messages from './messages';
import useStyles from './styles';
import CreateWorkFlowForm, {
  formName,
} from './CreateForm';

export const CreateWorkFlowPage = ({
  createWorkFlow,
  submitForm,
  url,
  clusterID,
  namespaceID,
  values,
  configMapURL,
  loadConfigMaps,
  secretURL,
  loadSecrets,
  loadStorageClasses,
  configMaps,
  secrets,
  storageClassesURL,
  storageClasses,
  pvc,
  pvcURL,
  loadPersistentVolumeClaims,
}) => {
  const classes = useStyles();
  const push = usePush();

  useEffect(() => {
    if (storageClassesURL) {
      loadStorageClasses(storageClassesURL, { clusterID });
    }
  }, [clusterID, loadStorageClasses, storageClassesURL]);
  useEffect(() => {
    if (configMapURL) {
      loadConfigMaps(configMapURL, { clusterID, namespaceID });
    }
    if (secretURL) {
      loadSecrets(secretURL, { clusterID, namespaceID });
    }
    if (pvcURL) {
      loadPersistentVolumeClaims(pvcURL, {
        clusterID,
        namespaceID,
      });
    }
  }, [clusterID, configMapURL, loadConfigMaps, loadPersistentVolumeClaims, loadSecrets, namespaceID, pvcURL, secretURL]);

  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();
      const { image:{name},deploy:{ containers, persistentVolumes} } = data;
      data.deploy.name = name;
      data.deploy.containers = containers.map((item) => {
        if (item && item.args) {
          item.args = parseCmd(item.args);
        }
        if (item && item.command) {
          item.command = parseCmd(item.command);
        }
        item.image = name;
        return item;
      });
      persistentVolumes.forEach((item) => {
        if (item && item.size) {
          item.size = `${item.size}Gi`;
        }
        // if (item && item.name) {
        //   if (pvc.get(item.name)) {
        //     item.size = pvc.getIn([item.name, 'actualStorageSize']);
        //   } else {
        //     item.size = `${item.size}Gi`;
        //   }
        // }
      });
      await new Promise((resolve, reject) => {
        createWorkFlow(data, {
          resolve,
          reject,
          url,
          clusterID,
          namespaceID,
        });
      });
      push(`/clusters/${clusterID}/namespaces/${namespaceID}/workFlows`);
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  return (
    <div className={classes.root}>
      <Helmet title={messages.createPageTitle} description={messages.createPageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/workFlows`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.createPageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <CreateWorkFlowForm
              onSubmit={doSubmit}
              formValues={values}
              configMaps={configMaps}
              secrets={secrets}
              storageClasses={storageClasses}
              pvc={pvc}
              initialValues={fromJS({
                deploy:{
                  replicas:1,
                  containers: [{
                    env: [{}],
                    volumes:[{}],
                    exposedPorts: [{}],
                  }],
                  advancedOptions: { injectServiceMesh: true },
                  persistentVolumes:[{}],
                },
              })}
            />
            <div className={classes.buttonGroup}>
              <Button
                variant="contained"
                color="primary"
                onClick={submitForm}
              >
                <FormattedMessage {...messages.save} />
              </Button>
              <Button
                variant="contained"
                className={classes.cancleBtn}
                onClick={() => {
                  push(
                    `/clusters/${clusterID}/namespaces/${namespaceID}/workFlows`
                  );
                }}
              >
                <FormattedMessage {...messages.cancle} />
              </Button>
            </div>  
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
  configMapURL: makeSelectConfigMapURL(),
  configMaps: makeSelectConfigMaps(),
  secretURL: makeSelectSecretURL(),
  pvcURL: makeSelectPvcURL(),
  secrets: makeSelectSecrets(),
  storageClasses: makeSelectStorageClasses(),
  storageClassesURL: makeSelectStorageClassesURL(),
  pvc: makeSelectPersistentVolumeClaims(),
  values: getFormValues(formName),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadConfigMaps: cActions.loadConfigMaps,
      loadSecrets: sActions.loadSecrets,
      loadStorageClasses: storagesAction.loadStorageClasses,
      loadPersistentVolumeClaims: pActions.loadPersistentVolumeClaims,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
)(CreateWorkFlowPage);
