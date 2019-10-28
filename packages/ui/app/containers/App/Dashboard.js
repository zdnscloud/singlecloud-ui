/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { procCollectionData } from '@gsmlg/utils/procData';

// @material-ui/core components
import CssBaseline from '@material-ui/core/CssBaseline';
// core components
import Footer from 'components/Footer/Footer';
import TerminalDialog from 'containers/TerminalPage/TerminalDialog';
import GlobalStyle from 'global-styles';

import * as actions from 'ducks/clusters/actions';
import * as nsActions from 'ducks/namespaces/actions';
import * as roleActions from 'ducks/role/actions';
import * as eventsActions from 'ducks/events/actions';
import { makeSelectShowEvents } from 'ducks/app/selectors';
import {
  makeSelectCurrentID as makeSelectCurrentClusterID,
  makeSelectCurrent as makeSelectCurrentCluster,
  makeSelectURL,
} from 'ducks/clusters/selectors';
import { makeSelectIsLogin } from 'ducks/role/selectors';

import EventsList from 'containers/EventsPage/EventsList';

import useStyles from './dashboardStyles';

import AppMenubar from './AppMenubar';
import LeftMenu from './LeftMenu';
import appRoutes from './routes';

export const Dashboard = ({
  cluster,
  clusterID,
  showEvents,
  url,
  loadClusters,
  loadNamespaces,
  openCluster,
  closeCluster,
}) => {
  useEffect(() => {
    (async () => {
      const resp = await new Promise((resolve, reject) => {
        loadClusters(url, { resolve, reject });
      });
      const { data, list } = procCollectionData(resp);
      for (let i = 0; i < list.length; i += 1) {
        const c = data[list[i]];
        const {
          id,
          links: { namespaces: nsUrl },
        } = c;
        loadNamespaces(nsUrl, { clusterID: id });
      }
    })();
  }, [loadClusters, loadNamespaces, url]);
  useEffect(() => {
    if (clusterID) {
      openCluster(clusterID);
    }
    return () => closeCluster();
  }, [closeCluster, clusterID, openCluster]);
  const nsUrl = cluster.getIn(['links', 'namespaces']);
  useEffect(() => {
    if (nsUrl) {
      loadNamespaces(nsUrl, { clusterID });
    }
  }, [nsUrl]);
  const hasEvents = clusterID && showEvents;
  const classes = useStyles({ hasEvents });

  return (
    <div className={classes.wrapper}>
      <LeftMenu />
      <div className={classes.mainWrapper}>
        <AppMenubar />
        <div className={classNames(classes.mainPanel)}>
          <div className={classes.content}>
            <Switch>
              {appRoutes.map((route, key) => (
                <Route
                  exact
                  key={key}
                  path={route.path}
                  component={route.component}
                />
              ))}
              <Redirect to="/clusters" />
            </Switch>
          </div>
          <div className={classes.events}>
            <EventsList />
          </div>
        </div>
      </div>
      <TerminalDialog />
      <GlobalStyle />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
  cluster: makeSelectCurrentCluster(),
  clusterID: makeSelectCurrentClusterID(),
  showEvents: makeSelectShowEvents(),
  isLogin: makeSelectIsLogin(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      ...nsActions,
      ...roleActions,
      ...eventsActions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Dashboard);
