/**
 *
 * Create Udpingress Page
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

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectServices } from 'ducks/services/selectors';
import {
  makeSelectURL,
  makeSelectServicesURL,
} from 'ducks/udpingresses/selectors';
import * as actions from 'ducks/udpingresses/actions';
import { loadServices } from 'ducks/services/actions';

import messages from './messages';
import useStyles from './styles';
import CreateUdpingressForm, { formName } from './CreateForm';

export const CreateUdpingressPage = ({
  createUdpingress,
  submitForm,
  url,
  clusterID,
  namespaceID,
  values,
  services,
  loadServices,
  surl,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (url) {
      loadServices(surl, {
        clusterID,
        namespaceID,
      });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [clusterID, loadServices, namespaceID, surl, url]);

  async function doSubmit(formValues) {
    try {
      const { rules } = formValues.toJS();
      const rulesArr = [];
      rules.forEach((item) => {
        const { port, servicePort, serviceName } = item;
        const rule = { port, servicePort, serviceName };
        rulesArr.push(rule);
      });
      const data = {
        ...rulesArr[0],
      };
      console.log('data', data);
      await new Promise((resolve, reject) => {
        createUdpingress(data, {
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
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/udpingresses`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.createPageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <CreateUdpingressForm
              onSubmit={doSubmit}
              formValues={values}
              services={services}
              initialValues={fromJS({})}
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
  services: makeSelectServices(),
  surl: makeSelectServicesURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadServices,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CreateUdpingressPage);