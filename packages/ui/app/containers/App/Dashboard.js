/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect, Fragment, useCallback, useState } from 'react';
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
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import * as actions from 'ducks/clusters/actions';
import * as nsActions from 'ducks/namespaces/actions';
import * as roleActions from 'ducks/role/actions';
import * as eventsActions from 'ducks/events/actions';
import * as appActions from 'ducks/app/actions';
import * as alarmsActions from 'ducks/alarms/actions';
import { makeSelectShowEvents, makeSelectLocation } from 'ducks/app/selectors';
import {
  makeSelectCurrentID as makeSelectCurrentClusterID,
  makeSelectCurrent as makeSelectCurrentCluster,
  makeSelectURL,
} from 'ducks/clusters/selectors';
import { makeSelectIsLogin, makeSelectIsAdmin } from 'ducks/role/selectors';

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
  isAdmin,
  setLastNamespace,
  location,
  openAlarmChannel,
  closeAlarmChannel,
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

  const path = location.get('pathname');
  const isManage = /^\/clusters\/[^/]+\/manage/.test(path);
  useEffect(() => {
    if (clusterID && !isManage) {
      openCluster(clusterID);
    }
    return () => closeCluster();
  }, [closeCluster, clusterID, openCluster, isManage]);

  const nsUrl = cluster.getIn(['links', 'namespaces']);
  useEffect(() => {
    if (nsUrl) {
      loadNamespaces(nsUrl, { clusterID });
    }
  }, [clusterID, loadNamespaces, nsUrl]);

  useEffect(() => {
    openAlarmChannel();
    return () => closeAlarmChannel();
  }, [closeAlarmChannel, openAlarmChannel]);

  const hasEvents = clusterID && showEvents;
  const classes = useStyles({ hasEvents });

  const [redirectUrl, setRedirectUrl] = useState('/');
  const redirectRef = useCallback(() => {
    if (isAdmin) {
      setRedirectUrl('/clusters');
    } else {
      loadClusters(url, {
        resolve({ response: { data } }) {
          if (data.length > 0) {
            const nurl = data[0].links.namespaces;
            const cID = data[0].id;
            loadNamespaces(nurl, {
              cID,
              resolve({ response: { data: nsData } }) {
                if (nsData.length > 0) {
                  const nID = nsData[0].id;
                  setLastNamespace(nID);
                  setRedirectUrl(`/clusters/${cID}/namespaces/${nID}/overview`);
                } else {
                  setRedirectUrl('/userQuotas');
                }
              },
              reject() {},
              url,
            });
          } else {
            setRedirectUrl('/userQuotas');
          }
        },
        reject() {},
      });
    }
  }, [isAdmin, loadClusters, loadNamespaces, setLastNamespace, url]);

  return (
    <div>
      <AppMenubar />
      <div className={classes.wrapper}>
        <LeftMenu />
        <div className={classes.mainWrapper}>
          <div className={classNames(classes.mainPanel)} ref={redirectRef}>
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
                <Redirect exact from="/" to={redirectUrl} />
                <Route component={NotFoundPage} />
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
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
  cluster: makeSelectCurrentCluster(),
  clusterID: makeSelectCurrentClusterID(),
  showEvents: makeSelectShowEvents(),
  isLogin: makeSelectIsLogin(),
  isAdmin: makeSelectIsAdmin(),
  location: makeSelectLocation(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      ...nsActions,
      ...roleActions,
      ...eventsActions,
      ...appActions,
      ...alarmsActions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Dashboard);
