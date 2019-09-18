/**
 *
 * Create Application Page
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import {
  makeSelectURL as makeSelectChartsURL,
  makeSelectCurrentID as makeSelectCurrentChartID,
  makeSelectCurrent as makeSelectCurrentChart,
} from 'ducks/charts/selectors';
import * as chartsActions from 'ducks/charts/actions';
import * as actions from 'ducks/applications/actions';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import useStyles from './styles';
import ApplicationsPageHelmet from './helmet';
import ApplicationForm from './ApplicationForm';

export const formName = 'createApplicationForm';

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

const CreateApplicationForm = reduxForm({
  form: formName,
  validate,
})(ApplicationForm);

/* eslint-disable react/prefer-stateless-function */
export const CreateApplicationPage = ({
  clusterID,
  namespaceID,
  chartID,
  chartsUrl,
  readChart,
  submitForm,
  createApplication,
  chart,
  values,
}) => {
  const classes = useStyles();
  useEffect(() => {
    readChart(chartID, {
      clusterID,
      namespaceID,
      url: `${chartsUrl}/${chartID}`,
    });
  }, [chartID, chartsUrl, clusterID, namespaceID, readChart]);

  async function doSubmit(formValues) {
    try {
      const { name, chartVersion, ...formData } = formValues.toJS();
      const url = `/apis/zcloud.cn/v1/clusters/${clusterID}/namespaces/${namespaceID}/applications`;
      const data = {
        name,
        chartVersion,
        chartName: chartID,
        configs: formData,
      };
      await new Promise((resolve, reject) => {
        createApplication(data, {
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
      <ApplicationsPageHelmet />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/charts`,
              name: <FormattedMessage {...messages.applicationStorePage} />,
            },
            {
              name: <FormattedMessage {...messages.createApplication} />,
            },
          ]}
        />
        <Typography component="div" className="">
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <CreateApplicationForm
                classes={classes}
                onSubmit={doSubmit}
                initialValues={fromJS({ name: chartID })}
                chart={chart}
                clusterID={clusterID}
                namespaceID={namespaceID}
                formValues={values}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Button variant="contained" color="primary" onClick={submitForm}>
                <FormattedMessage {...messages.createApplicationButton} />
              </Button>
              <Button
                variant="contained"
                className={classes.cancleBtn}
                to={`/clusters/${clusterID}/namespaces/${namespaceID}/charts`}
                component={Link}
              >
                <FormattedMessage {...messages.cancleApplicationButton} />
              </Button>
            </GridItem>
          </GridContainer>
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  chartsUrl: makeSelectChartsURL(),
  chart: makeSelectCurrentChart(),
  chartID: makeSelectCurrentChartID(),
  values: getFormValues(formName),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...chartsActions,
      ...actions,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CreateApplicationPage);
