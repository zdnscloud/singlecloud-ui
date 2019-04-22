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

import { makeSelectIsLogin } from 'ducks/role/selectors';

import logo from 'images/favicon.png';
import image from 'assets/img/sidebar-3.jpg';
import dashboardStyle from './dashboardStyles';

import AppMenubar from './AppMenubar';
import SelectCluster from './SelectCluster';
import appRoutes from './routes';
import * as actions from './actions';
import {
  makeSelectActiveCluster,
  makeSelectMenus,
  makeSelectClusterID,
  makeSelectShowEvents,
  makeSelectLocation,
} from './selectors';
import { makeSelectClusters } from '../ClustersPage/selectors';
import GlobalStyle from '../../global-styles';
import EventsTable from '../EventsPage/EventsTable';

class App extends PureComponent {
  state = { image, hasError: false };

  componentWillMount() {
    const { isLogin, history } = this.props;
    if (!isLogin) {
      history.push('/login');
    }
    this.props.initAction();
  }

  componentWillUpdate(nextProps) {
    const { isLogin, history } = nextProps;
    if (!isLogin) {
      history.push('/login');
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
      ...rest
    } = this.props;

    return (
      <div className={classes.wrapper}>
        <AppMenubar />
        <Sidebar
          routes={menus}
          logoText="Single Cloud"
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />
        <div className={classes.mainPanel} data-ref="mainPanel">
          {clusterID && (
            <div className={classes.eventPage}>
              <ExpansionPanel square expanded={showEvents}>
                <ExpansionPanelDetails>
                  {showEvents && <EventsTable />}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          )}
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
        <GlobalStyle />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusters: makeSelectClusters(),
  activeCluster: makeSelectActiveCluster(),
  menus: makeSelectMenus(),
  clusterID: makeSelectClusterID(),
  showEvents: makeSelectShowEvents(),
  isLogin: makeSelectIsLogin(),
  currentLocation: makeSelectLocation(),
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

export default compose(
  withConnect,
  withStyles(dashboardStyle)
)(App);
