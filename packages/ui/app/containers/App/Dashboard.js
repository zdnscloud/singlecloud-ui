/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { PureComponent, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import classNames from 'classnames';

// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import EventIcon from '@material-ui/icons/Event';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
// core components
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';
import Menubar from 'components/Menubar';
import TerminalDialog from 'containers/TerminalPage/TerminalDialog';
import GlobalStyle from 'global-styles';

import * as roleActions from 'ducks/role/actions';
import * as actions from 'ducks/app/actions';
import {
  makeSelectActiveCluster,
  makeSelectClusterID,
  makeSelectShowEvents,
  makeSelectLocation,
  makeSelectShowMenuText,
} from 'ducks/app/selectors';
import { makeSelectClusters } from 'ducks/clusters/selectors';
import { makeSelectIsLogin } from 'ducks/role/selectors';
import EventsList from 'containers/EventsPage/EventsList';

import dashboardStyle from './dashboardStyles';

import AppMenubar from './AppMenubar';
import SelectCluster from './SelectCluster';
import LeftMenu from './LeftMenu';
import appRoutes from './routes';

class Dashboard extends PureComponent {
  state = { hasError: false };

  componentWillMount() {
    const { isLogin, history, initAction, casRole } = this.props;
    if (!isLogin) {
      // history.push('/login');
      casRole('/cas/role');
    } else {
      initAction();
    }
  }

  componentWillUpdate(nextProps) {
    const { isLogin, history, initAction, casRole } = nextProps;
    if (!isLogin) {
      // history.push('/login');
      casRole('/cas/role');
    } else {
      // initAction();
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <pre>{`${this.state.error}`}</pre>
        </div>
      );
    }
    const {
      classes,
      clusters,
      clusterID,
      menus,
      showEvents,
      activeCluster,
      changeCluster,
      toggleEventsView,
      showMenuText,
    } = this.props;
    const hasEvents = clusterID && showEvents;

    return (
      <div className={classes.wrapper}>
        <AppMenubar />
        <LeftMenu />
        <div
          className={classNames(classes.mainPanel)}
          data-ref="mainPanel"
          style={{
            marginRight: hasEvents ? '310px' : null,
            width: `calc(100% - ${(hasEvents ? 310 : 0) + (showMenuText ? 232 : 60)}px)`,
          }}
        >
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
          <Footer />
        </div>
        <TerminalDialog />
        {hasEvents && (
          <div className={classes.eventPage}>
            <EventsList />
          </div>
        )}
        <GlobalStyle />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusters: makeSelectClusters(),
  activeCluster: makeSelectActiveCluster(),
  clusterID: makeSelectClusterID(),
  showEvents: makeSelectShowEvents(),
  isLogin: makeSelectIsLogin(),
  currentLocation: makeSelectLocation(),
  showMenuText: makeSelectShowMenuText(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      ...roleActions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(dashboardStyle)
)(Dashboard);
