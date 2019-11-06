/**
 *
 * UserQuotasPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Link } from 'react-router-dom';

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
import AddIcon from 'components/Icons/Add';
import Helmet from 'components/Helmet/Helmet';

import { makeSelectURL } from 'ducks/userQuotas/selectors';
import * as actions from 'ducks/userQuotas/actions';

import messages from './messages';
import useStyles from './styles';
import UserQuotasTable from './UserQuotasTable';

const UserQuotasPage = ({ url, loadUserQuotas }) => {
  const classes = useStyles();

  useEffect(() => {
    if (url) {
      loadUserQuotas(url);
    }
    const t = setInterval(() => loadUserQuotas(url), 3000);
    return () => clearInterval(t);
  }, [loadUserQuotas, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: '/userQuotas',
              name: <FormattedMessage {...messages.userQuotas} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.userQuotas} />
                </h4>
                <IconButton
                  aria-label={<FormattedMessage {...messages.userQuotas} />}
                  component={Link}
                  to="/userQuotas/create"
                >
                  <AddIcon />
                </IconButton>
              </CardHeader>
              <CardBody>
                <UserQuotasTable />
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

export default compose(withConnect)(UserQuotasPage);
