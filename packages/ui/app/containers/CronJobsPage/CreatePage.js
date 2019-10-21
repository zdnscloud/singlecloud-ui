/**
 *
 * Create Cronjob Page
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
import { makeSelectURL } from 'ducks/cronJobs/selectors';
import * as actions from 'ducks/cronJobs/actions';
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

import messages from './messages';
import useStyles from './styles';
import CreateCronjobForm, { formName } from './CreateForm';

export const CreateCronjobPage = ({
  createCronJob,
  submitForm,
  url,
  clusterID,
  namespaceID,
  values,
  secrets,
  configMaps,
  configMapURL,
  loadConfigMaps,
  secretURL,
  loadSecrets,
}) => {
  const classes = useStyles();
  const push = usePush();

  useEffect(() => {
    if (configMapURL) {
      loadConfigMaps(configMapURL, { clusterID, namespaceID });
    }
    if (secretURL) {
      loadSecrets(secretURL, { clusterID, namespaceID });
    }
  }, [
    clusterID,
    configMapURL,
    loadConfigMaps,
    loadSecrets,
    namespaceID,
    secretURL,
  ]);
  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();
      const { containers } = data;
      containers.forEach((item) => {
        if (item && item.args) {
          // eslint-disable-next-line no-param-reassign
          item.args = item.args.split(' ');
        }
        if (item && item.command) {
          // eslint-disable-next-line no-param-reassign
          item.command = item.command.split(' ');
        }
      });
      await new Promise((resolve, reject) => {
        createCronJob(data, {
          resolve,
          reject,
          url,
          clusterID,
          namespaceID,
        });
      });
      push(`/clusters/${clusterID}/namespaces/${namespaceID}/cronJobs`);
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
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/cronJobs`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.createPageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <CreateCronjobForm
              onSubmit={doSubmit}
              formValues={values}
              configMaps={configMaps}
              secrets={secrets}
              initialValues={fromJS({
                replicas: 1,
                containers: [{ name: '' }],
              })}
            />
            <Button variant="contained" color="primary" onClick={submitForm}>
              <FormattedMessage {...messages.save} />
            </Button>
            <Button
              variant="contained"
              className={classes.cancleBtn}
              onClick={() => {
                push(
                  `/clusters/${clusterID}/namespaces/${namespaceID}/cronJobs`
                );
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
  configMapURL: makeSelectConfigMapURL(),
  configMaps: makeSelectConfigMaps(),
  secretURL: makeSelectSecretURL(),
  secrets: makeSelectSecrets(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadConfigMaps: cActions.loadConfigMaps,
      loadSecrets: sActions.loadSecrets,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CreateCronjobPage);
