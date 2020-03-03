/**
 *
 * LogsPage
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import TrueIcon from 'components/Icons/True';
import FalseIcon from 'components/Icons/False';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectURL } from 'ducks/workFlows/selectors';
import * as actions from 'ducks/workFlows/actions';

import useStyles from './styles';
import messages from './messages';
import Stepper from './components/WorkFlowStepper';

const LogsPage = ({
  clusterID,
  namespaceID,
  location,
  url,
  loadWorkFlows,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (url) {
      loadWorkFlows(url, {
        clusterID,
        namespaceID,
      });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [clusterID, loadWorkFlows, namespaceID, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.logsPageTitle} description={messages.logsPageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/workFlows`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.logsPageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.workFlows } />
                </h4>
              </CardHeader>
              <CardBody>
                <Stepper />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.workFlows } />
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer >
                  <GridItem xs={3} sm={3} md={3}>
                    <List className={classes.list}>
                      <ListItem className={classes.success}>
                        <ListItemAvatar>
                          <TrueIcon />
                        </ListItemAvatar>
                        <ListItemText primary="success" />
                      </ListItem>
                      <ListItem className={classes.fails}>
                        <ListItemAvatar>
                          <FalseIcon />
                        </ListItemAvatar>
                        <ListItemText primary="fails" />
                      </ListItem>
                    </List>
                  </GridItem>
                  <GridItem xs={9} sm={9} md={9}>
                    
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  url: makeSelectURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch,
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
)(LogsPage);
