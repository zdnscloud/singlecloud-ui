/**
 *
 * AlarmMessagesPage
 *
 */
import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'components/Icons/Add';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import { makeSelectURL } from 'ducks/alarms/selectors';
import * as actions from 'ducks/alarms/actions';

import useStyles from './styles';
import messages from './messages';
import AlarmsTable from './Table';

const AlarmMessagesPage = ({ url, loadAlarms }) => {
  const classes = useStyles();
  useEffect(() => {
    loadAlarms(url);
    return () => {
      // try cancel something when unmount
    };
  }, [loadAlarms, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/alarms`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.alarms} />
                </h4>
              </CardHeader>
              <CardBody>
                <AlarmsTable />
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
  bindActionCreators({ ...actions }, dispatch);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AlarmMessagesPage);
