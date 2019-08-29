/**
 *
 * CreateSecretPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector, createSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import * as actions from 'ducks/secrets/actions';
import { makeSelectURL } from 'ducks/secrets/selectors';

import messages from './messages';
import SecretsPageHelmet from './helmet';
import styles from './styles';
import SecretForm from './SecretForm';
export const formName = 'createSecretForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  const configs = values.get('configs');
  if (!configs || configs.size === 0) {
    errors.configs = [];
    errors.configs._error = 'At least one config file must be add'; // eslint-disable-line
  } else {
    errors.configs = [];
    configs.forEach((c) => {
      if (c) {
        const { name, data } = c;
        const err = {};
        if (!name) err.name = 'Required';
        if (!data) err.data = 'Required';
        errors.configs.push(err);
      } else {
        errors.configs.push({ name: 'Required', data: 'Required' });
      }
    });
  }
  return errors;
};

const CreateSecretForm = reduxForm({
  form: formName,
  validate,
})(SecretForm);

/* eslint-disable react/prefer-stateless-function */
export const CreateSecret = ({
  classes,
  createSecret,
  submitForm,
  url,
  clusterID,
  namespaceID,
  routeTo,
}) => {
  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();
      await new Promise((resolve, reject) => {
        createSecret(data, {
          resolve,
          reject,
          url,
          clusterID,
          namespaceID,
        });
      });
      routeTo(`/clusters/${clusterID}/namespaces/${namespaceID}/secrets`);
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  return (
    <div className={classes.root}>
      <SecretsPageHelmet />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/secrets`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/secrets/create`,
              name: <FormattedMessage {...messages.createSecret} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.createSecret} />
                </h4>
              </CardHeader>
              <CardBody>
                <CreateSecretForm
                  classes={classes}
                  onSubmit={doSubmit}
                  initialValues={fromJS({})}
                  type="create"
                />
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={submitForm}
                >
                  <FormattedMessage {...messages.formCreate} />
                </Button>
              </CardFooter>
            </Card>
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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      routeTo: push,
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
  withStyles(styles)
)(CreateSecret);
