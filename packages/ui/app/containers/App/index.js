/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import Navbar from 'components/Navbars/Navbar';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';
import FixedPlugin from 'components/FixedPlugin/FixedPlugin';
import Menubar from 'components/Menubar';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ClustersPage from 'containers/ClustersPage/Loadable';
import NodesPage from 'containers/NodesPage/Loadable';
import NamespacesPage from 'containers/NamespacesPage/Loadable';
import DeploymentsPage from 'containers/DeploymentsPage/Loadable';
import CreateDeployment from 'containers/DeploymentsPage/CreateLoadable';
import PodsPage from 'containers/PodsPage/Loadable';
import TerminalPage from 'containers/TerminalPage/Loadable';
import EventsPage from 'containers/EventsPage/Loadable';
import ConfigMapsPage from 'containers/ConfigMapsPage/Loadable';
import ServicesPage from 'containers/ServicesPage/Loadable';
import IngressesPage from 'containers/IngressesPage/Loadable';
import CreateConfigMap from 'containers/ConfigMapsPage/CreateLoadable';

import dashboardStyle from 'assets/jss/material-dashboard-react/layouts/dashboardStyle';
import logo from 'images/favicon.png';
import image from 'assets/img/sidebar-3.jpg';

import SelectCluster from './SelectCluster';
import appRoutes from './routes';
import * as actions from './actions';
import { makeSelectActiveCluster, makeSelectMenus } from './selectors';
import { makeSelectClusters } from '../ClustersPage/selectors';

const switchRoutes = (
  <Switch>
    {appRoutes.map((prop, key) => (
      <Route exact path={prop.path} component={prop.component} key={key} />
    ))}
  </Switch>
);

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'light',
  },
});

class App extends Component {
  state = { image, hasError: false };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    console.error(error, info); // eslint-disable-line
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
      activeCluster,
      changeCluster,
      menus,
      ...rest
    } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.wrapper}>
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
            <Menubar
              headerText={
                <SelectCluster
                  clusters={clusters}
                  changeCluster={changeCluster}
                  activeCluster={activeCluster}
                />
              }
            />
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
            <Footer />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusters: makeSelectClusters(),
  activeCluster: makeSelectActiveCluster(),
  menus: makeSelectMenus(),
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
  withRouter,
  withConnect,
  withStyles(dashboardStyle)
)(App);
