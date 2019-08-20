/**
 *
 * Update Registry Page
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

import {
  makeSelectURL,
  makeSelectRegistriesList
} from 'ducks/registries/selectors';
import * as actions from 'ducks/registries/actions';
import { makeSelectClusters } from 'ducks/clusters/selectors';

import messages from './messages';
import useStyles from './styles';
import UpdateRegistryForm, { formName } from './UpdateForm';

export const UpdateRegistryPage = ({
  updateRegistry,
  loadRegistries,
  submitForm,
  url,
  clusters,
  values,
  list,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (url) {
      loadRegistries(url);
    }
    return () => {
      // try cancel something when unmount
    };
  }, [url]);

  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();

      await new Promise((resolve, reject) => {
        updateRegistry(data, {
          resolve,
          reject,
          url,
        });
      });
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
              path: `/registries`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.updatePageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <UpdateRegistryForm
              onSubmit={doSubmit}
              formValues={values}
              clusters={clusters}
              initialValues={list && list.getIn([0])}
            />
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
  url: makeSelectURL(),
  values: getFormValues(formName),
  clusters: makeSelectClusters(),
  list: makeSelectRegistriesList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(UpdateRegistryPage);
