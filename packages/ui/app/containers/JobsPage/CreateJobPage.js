/**
 *
 * Create Job Page
 *
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import {
  reduxForm,
  getFormValues,
  SubmissionError,
  submit,
} from 'redux-form/immutable';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import * as cActions from 'ducks/configMaps/actions';
import {
  makeSelectConfigMaps,
  makeSelectURL as makeSelectConfigMapURL,
} from 'ducks/configMaps/selectors';

import { makeSelectURL } from 'ducks/jobs/selectors';
import * as actions from 'ducks/jobs/actions';

import messages from './messages';
import JobsHelmet from './helmet';
import styles from './styles';
import JobForm from './JobForm';

export const formName = 'createJobForm';

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

const CreateJobForm = reduxForm({
  form: formName,
  validate,
})(JobForm);

/* eslint-disable react/prefer-stateless-function */
export class CreateJob extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { clusterID, namespaceID, configMapURL, loadConfigMaps } = this.props;
    loadConfigMaps({ url: configMapURL, clusterID, namespaceID });
  }

  componentDidUpdate(prevProps) {
    const {
      clusterID: prevClusterID,
      namespaceID: prevNamespaceID,
    } = prevProps;
    const { clusterID, namespaceID, configMapURL, loadConfigMaps } = this.props;
    if (prevClusterID !== clusterID || prevNamespaceID !== namespaceID) {
      loadConfigMaps({ url: configMapURL, clusterID, namespaceID });
    }
  }

  render() {
    const {
      classes,
      createJob,
      submitForm,
      url,
      clusterID,
      namespaceID,
      configMaps,
      values,
      theme,
    } = this.props;
    async function doSubmit(formValues) {
      try {
        const data = formValues.toJS();
        const { containers } = data;
        containers.forEach((item) => {
          if (item && item.args) {
            item.args = item.args.split(' ');
          }
          if (item && item.command) {
            item.command = item.command.split(' ');
          }
        });
        await new Promise((resolve, reject) => {
          createJob(data, {
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
        <JobsHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/clusters/${clusterID}/namespaces/${namespaceID}/jobs`,
                name: <FormattedMessage {...messages.pageTitle} />,
              },
              {
                name: <FormattedMessage {...messages.createJob} />,
              },
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <CreateJobForm
                classes={classes}
                onSubmit={doSubmit}
                configMaps={configMaps}
                initialValues={fromJS({
                  replicas: 1,
                  containers: [{ name: '' }],
                })}
                formValues={values}
                theme={theme}
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
  }
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  configMapURL: makeSelectConfigMapURL(),
  url: makeSelectURL(),
  configMaps: makeSelectConfigMaps(),
  values: getFormValues(formName),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadConfigMaps: cActions.loadConfigMaps,
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
  withStyles(styles, { withTheme: true })
)(CreateJob);
