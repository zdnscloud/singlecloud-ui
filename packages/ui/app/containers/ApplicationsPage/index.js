/**
 *
 * ApplicationsPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Link } from 'react-router-dom';
import { SubmissionError, submit } from 'redux-form';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';

import CssBaseline from '@material-ui/core/CssBaseline';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Button from '@material-ui/core/Button';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectURL } from 'ducks/applications/selectors';
import * as actions from 'ducks/applications/actions';
import ErrorInfo from 'components/ErrorInfo/ErrorInfo';
import Helmet from 'components/Helmet/Helmet';

import messages from './messages';
import useStyles from './styles';
import ApplicationsList from './ApplicationsList';
import SearchForm from './form/searchForm';

export const formName = 'searchApplicationsForm';

const validate = (values) => {
  const errors = {};
  return errors;
};

const SearchApplicationsForm = reduxForm({
  form: formName,
  validate,
})(SearchForm);

const ApplicationsPage = ({
  clusterID,
  namespaceID,
  url,
  loadApplications,
  submitForm,
  clearDeleteErrorInfo,
}) => {
  const classes = useStyles();
  const [filter, setFilter] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (url) {
      loadApplications(url, { clusterID, namespaceID });
    }
    const t = setInterval(
      () => loadApplications(url, { clusterID, namespaceID }),
      3000
    );
    return () => clearInterval(t);
  }, [clusterID, loadApplications, namespaceID, url]);

  const doSubmit = (formValues) => {
    setFilter(formValues.toJS());
  };

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              name: <FormattedMessage {...messages.pageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          {error ? (
            <ErrorInfo
              errorText={getByKey(error, ['response', 'message'])}
              close={() => setError(null)}
            />
          ) : null}
          <GridItem xs={12} sm={12} md={12}>
            <Card className={classes.card}>
              <GridContainer style={{ marginBottom: '20px' }}>
                <GridItem xs={3} sm={3} md={3}>
                  <SearchApplicationsForm onSubmit={doSubmit} />
                </GridItem>
                <GridItem xs={6} sm={6} md={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                    style={{ marginTop: '10px' }}
                  >
                    <FormattedMessage {...messages.searchApplicationsButton} />
                  </Button>
                </GridItem>
              </GridContainer>
              <ApplicationsList filter={filter} />
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  url: makeSelectURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ApplicationsPage);
