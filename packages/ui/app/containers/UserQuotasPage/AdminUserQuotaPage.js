/**
 *
 * AdminUserQuotaPage
 *
 */

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Link } from 'react-router-dom';
import { fromJS } from 'immutable';
import getByKey from '@gsmlg/utils/getByKey';

import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ErrorInfo from 'components/ErrorInfo/ErrorInfo';
import Helmet from 'components/Helmet/Helmet';

import {
  makeSelectURL,
  makeSelectUserQuotasList,
} from 'ducks/userQuotas/selectors';
import * as actions from 'ducks/userQuotas/actions';

import messages from './messages';
import useStyles from './styles';
import AdminUserQuotasTable from './AdminUserQuotasTable';
import SearchUserQuotaForm from './form/searchForm';

const AdminUserQuotaPage = ({ loadUserQuotas, url }) => {
  const classes = useStyles();
  const [filter, setFilter] = useState({});
  const [error, setError] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (url) {
      loadUserQuotas(url);
    }
    const t = setInterval(() => loadUserQuotas(url), 3000);
    return () => clearInterval(t);
  }, [loadUserQuotas, url]);

  const doSubmit = (formValues) => {
    setFilter(formValues);
  };

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: '/adminUserQuotas',
              name: <FormattedMessage {...messages.adminRequestListPage} />,
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
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.requestList} />
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer style={{ marginBottom: '20px' }}>
                  <GridItem xs={6} sm={6} md={6}>
                    <SearchUserQuotaForm
                      classes={classes}
                      onSubmit={doSubmit}
                      formRef={formRef}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6} md={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        formRef.current.dispatchEvent(
                          new Event('submit', { cancelable: true })
                        );
                      }}
                      type="submit"
                      style={{ marginTop: '10px' }}
                    >
                      <FormattedMessage {...messages.searchUserQuotaButton} />
                    </Button>
                  </GridItem>
                </GridContainer>
                <AdminUserQuotasTable filter={filter} setError={setError} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(AdminUserQuotaPage);
