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

import { usePush, useLocation } from 'hooks/router';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Helmet from 'components/Helmet/Helmet';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import {
  makeSelectURL as makeSelectChartsURL,
  makeSelectCurrentID as makeSelectCurrentChartID,
  makeSelectCurrent as makeSelectCurrentChart,
  makeSelectCharts,
} from 'ducks/charts/selectors';
import * as chartsActions from 'ducks/charts/actions';
import * as actions from 'ducks/applications/actions';
import {
  makeSelectStorageClasses,
  makeSelectURL as makeSelectStorageClassesURL,
} from 'ducks/storageClasses/selectors';
import * as storagesActions from 'ducks/storageClasses/actions';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import useStyles from './styles';
import ApplicationForm from './ApplicationForm';
import chartsMessages from '../ApplicationStorePage/messages';

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
  chartsUrl,
  readChart,
  submitForm,
  createApplication,
  loadStorageClasses,
  storageClasses,
  storageClassesURL,
  charts,
  values,
}) => {
  const classes = useStyles();
  const push = usePush();
  const location = useLocation();
  const { pathname } = location;

  const reg = new RegExp('^/clusters/[^/]+/namespaces/[^/]+/([^/]+)/([^/]+)');
  const [path, res, chartID] = reg.exec(pathname) || [];
  let isZcloudChart = false;
  if (res === 'charts') {
    isZcloudChart = true;
  }
  const chart = charts.get(chartID) || charts.clear();

  useEffect(() => {
    readChart(chartID, {
      clusterID,
      namespaceID,
      url: `${chartsUrl}/${chartID}`,
    });
    if (storageClassesURL) {
      loadStorageClasses(storageClassesURL, { clusterID });
    }
  }, [chartID, chartsUrl, clusterID, loadStorageClasses, namespaceID, readChart, storageClassesURL]);

  async function doSubmit(formValues) {
    try {
      const {
        name,
        injectServiceMesh,
        chartVersion,
        ...formData
      } = formValues.toJS();
      const url = `/apis/zcloud.cn/v1/clusters/${clusterID}/namespaces/${namespaceID}/applications`;
      const data = {
        name,
        chartVersion,
        injectServiceMesh,
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
      push(`/clusters/${clusterID}/namespaces/${namespaceID}/applications`);
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  const storeTitle = isZcloudChart ? chartsMessages.pageTitle : chartsMessages.pageTitleUsers;

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/${res}`,
              name: <FormattedMessage {...storeTitle} />,
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
                initialValues={fromJS({
                  name: chartID,
                  injectServiceMesh: true,
                })}
                chart={chart}
                storageClasses={storageClasses}
                clusterID={clusterID}
                namespaceID={namespaceID}
                formValues={values}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.buttonGroup}>
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
              </div>
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
  storageClasses: makeSelectStorageClasses(),
  storageClassesURL: makeSelectStorageClassesURL(),
  charts: makeSelectCharts(),
  values: getFormValues(formName),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...chartsActions,
      ...storagesActions,
      ...actions,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CreateApplicationPage);
