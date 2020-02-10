/**
 *
 * CreateConfigMapPage
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
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Helmet from 'components/Helmet/Helmet';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import * as actions from 'ducks/configMaps/actions';
import {
  makeSelectURL,
  makeSelectCurrent,
  makeSelectCurrentID,
} from 'ducks/configMaps/selectors';

import messages from './messages';
import useStyles from './styles';
import ConfigMapForm from './ConfigMapForm';

export const formName = 'createConfigMapForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = [];
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
        const name = c.get('name');
        const data = c.get('data');
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

const CreateConfigMapForm = reduxForm({
  form: formName,
  validate,
})(ConfigMapForm);

export const EditConfigMap = ({
  readConfigMap,
  updateConfigMap,
  submitForm,
  clusterID,
  namespaceID,
  id,
  url,
  configMap,
  routeTo,
}) => {
  const classes = useStyles();
  useEffect(() => {
    readConfigMap(id, { url: `${url}/${id}`, clusterID, namespaceID });
  }, [clusterID, id, namespaceID, readConfigMap, url]);

  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();
      const updateUrl = configMap.getIn(['links', 'update']);
      await new Promise((resolve, reject) => {
        updateConfigMap(data, {
          resolve,
          reject,
          url: updateUrl,
          clusterID,
          namespaceID,
        });
      });
      routeTo(`/clusters/${clusterID}/namespaces/${namespaceID}/configmaps`);
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/configmaps`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.editConfigMap} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.editConfigMap} />
                </h4>
              </CardHeader>
              <CardBody>
                <CreateConfigMapForm
                  classes={classes}
                  onSubmit={doSubmit}
                  initialValues={configMap}
                  configMap={configMap}
                  type="edit"
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
  id: makeSelectCurrentID(),
  configMap: makeSelectCurrent(),
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

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(EditConfigMap);
