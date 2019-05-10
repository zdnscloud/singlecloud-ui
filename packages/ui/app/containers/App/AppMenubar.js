/**
 *
 * AppMenubar
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
import { Switch, Route, Redirect, Link } from 'react-router-dom';
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
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
// core components
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';
import Menubar from 'components/Menubar';

import { makeSelectRole } from 'ducks/role/selectors';
import * as roleActions from 'ducks/role/actions';

import SelectCluster from './SelectCluster';
import SelectNamespace from '../NamespacesPage/SelectNamespace';
import dashboardStyle from './dashboardStyles';
import * as actions from './actions';
import {
  makeSelectActiveCluster,
  makeSelectClusterID,
  makeSelectShowEvents,
  makeSelectLocation,
  makeSelectUserMenus,
  makeSelectShowMenuText,
} from './selectors';
import { makeSelectClusters } from '../ClustersPage/selectors';

class AppMenubar extends PureComponent {
  static propTypes = {
    clusters: PropTypes.object,
  };

  state = {
    userEl: null,
  };

  openUserMenu(evt) {
    this.setState({ userEl: evt.currentTarget });
  }

  closeUserMenu(evt) {
    this.setState({ userEl: null });
  }

  render() {
    const {
      classes,
      clusters,
      clusterID,
      showEvents,
      activeCluster,
      changeCluster,
      toggleEventsView,
      role,
      userMenus,
      logout,
      showMenuText,
      toggleMenuText,
    } = this.props;
    const { userEl } = this.state;

    return (
      <Menubar
        onClickMenuButton={(evt) => toggleMenuText(!showMenuText)}
        headerLeftContent={
          <Fragment>
            <SelectCluster
              clusters={clusters}
              changeCluster={changeCluster}
              activeCluster={clusterID}
            />
            {clusterID && <SelectNamespace />}
          </Fragment>
        }
        headerRightContent={
          <Fragment>
            <IconButton
              color="inherit"
              onClick={(evt) => this.openUserMenu(evt)}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={userEl}
              open={Boolean(userEl)}
              onClose={(evt) => this.closeUserMenu(evt)}
            >
              <MenuItem disabled>{role.get('user')}</MenuItem>
              <Divider />
              {userMenus.map((m, index) => (
                <MenuItem key={m.name} component={Link} to={m.path}>
                  {m.name}
                </MenuItem>
              ))}
              <Divider />
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
            {clusterID && (
              <IconButton
                color="inherit"
                onClick={(evt) => toggleEventsView(!showEvents)}
              >
                <EventIcon />
                <small>
                  Cluster Events
                </small>
              </IconButton>
            )}
          </Fragment>
        }
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusters: makeSelectClusters(),
  activeCluster: makeSelectActiveCluster(),
  clusterID: makeSelectClusterID(),
  showEvents: makeSelectShowEvents(),
  currentLocation: makeSelectLocation(),
  role: makeSelectRole(),
  userMenus: makeSelectUserMenus(),
  showMenuText: makeSelectShowMenuText(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      logout: roleActions.logout,
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
)(AppMenubar);
