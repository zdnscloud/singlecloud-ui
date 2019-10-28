/* eslint-disable jsx-a11y/aria-role */
/**
 *
 * Update Deployment Page
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
} from 'ducks/deployments/selectors';
import * as actions from 'ducks/deployments/actions';
import * as cActions from 'ducks/configMaps/actions';
import {
  makeSelectConfigMaps,
  makeSelectURL as makeSelectConfigMapURL,
} from 'ducks/configMaps/selectors';
import * as sActions from 'ducks/secrets/actions';
import {
  makeSelectStorageClasses,
  makeSelectURL as makeSelectStorageClassesURL,
} from 'ducks/storageClasses/selectors';
import * as storagesAction from 'ducks/storageClasses/actions';
import {
  makeSelectSecrets,
  makeSelectURL as makeSelectSecretURL,
} from 'ducks/secrets/selectors';

import messages from './messages';
import useStyles from './styles';
import DeploymentForm, { formName } from './CreateForm';

export const UpdateDeploymentPage = ({
  updateDeployment,
  readDeployment,
  submitForm,
  url,
  clusterID,
  namespaceID,
  id,
  current,
  values,
  cluster,
  configMapURL,
  loadConfigMaps,
  secretURL,
  loadSecrets,
  loadStorageClasses,
  createDeployment,
  configMaps,
  secrets,
  storageClassesURL,
  storageClasses,
}) => {
  const classes = useStyles();
  const push = usePush();
  useEffect(() => {
    if (current.size === 0) {
      readDeployment(id, {
        url: `${url}/${id}`,
        clusterID,
        namespaceID,
      });
    }
    return () => {
      // cancel someThing
    };
  }, [clusterID, namespaceID, id, current.size, readDeployment, url]);
  useEffect(() => {
    loadStorageClasses(storageClassesURL, { clusterID });
  }, [clusterID, loadStorageClasses, storageClassesURL]);
  useEffect(() => {
    loadConfigMaps({ url: configMapURL, clusterID, namespaceID });
    loadSecrets({ url: secretURL, clusterID, namespaceID });
  }, [
    clusterID,
    configMapURL,
    loadConfigMaps,
    loadSecrets,
    namespaceID,
    secretURL,
  ]);

  async function doSubmit(formValues) {
    const updateUrl = current.getIn(['links', 'update']);
    try {
      const data = formValues.toJS();
      await new Promise((resolve, reject) => {
        updateDeployment(data, {
          resolve,
          reject,
          url: updateUrl,
          clusterID,
          namespaceID,
        });
      });
      push(`/clusters/${clusterID}/namespaces/${namespaceID}/deployments`);
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
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/deployments`,
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
              <DeploymentForm
                classes={classes}
                onSubmit={doSubmit}
                configMaps={configMaps}
                secrets={secrets}
                storageClasses={storageClasses}
                initialValues={current}
                formValues={values}
                role="update"
              />
            )}
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={submitForm}
            >
              <FormattedMessage {...messages.update} />
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
  configMapURL: makeSelectConfigMapURL(),
  configMaps: makeSelectConfigMaps(),
  secretURL: makeSelectSecretURL(),
  secrets: makeSelectSecrets(),
  storageClasses: makeSelectStorageClasses(),
  storageClassesURL: makeSelectStorageClassesURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadConfigMaps: cActions.loadConfigMaps,
      loadSecrets: sActions.loadSecrets,
      loadStorageClasses: storagesAction.loadStorageClasses,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(UpdateDeploymentPage);
