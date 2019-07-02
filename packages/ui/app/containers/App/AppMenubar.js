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
import DownIcon from 'components/Icons/Down';
import ShellIcon from 'components/Icons/Shell';
import AccountIcon from 'components/Icons/Account';
import SelectNamespace from 'containers/NamespacesPage/SelectNamespace';

import { makeSelectRole } from 'ducks/role/selectors';
import * as roleActions from 'ducks/role/actions';
import { openTerminal } from 'containers/TerminalPage/actions';
import * as actions from 'ducks/app/actions';
import {
  makeSelectActiveCluster,
  makeSelectClusterID,
  makeSelectShowEvents,
  makeSelectLocation,
  makeSelectUserMenus,
  makeSelectShowMenuText,
} from 'ducks/app/selectors';
import { makeSelectClusters } from 'ducks/clusters/selectors';

import SelectCluster from './SelectCluster';
import dashboardStyle from './dashboardStyles';
import messages from './messages';

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
      openTerminal,
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
            {clusterID && (
              <IconButton color="inherit" onClick={openTerminal}>
                <ShellIcon />
              </IconButton>
            )}
            <IconButton
              color="inherit"
              onClick={(evt) => this.openUserMenu(evt)}
            >
              <AccountIcon />
              <small style={{ fontSize: '14px' }}>{role.get('user')}</small>
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={userEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={Boolean(userEl)}
              onClose={(evt) => this.closeUserMenu(evt)}
            >
              {userMenus.map((m, index) => (
                <MenuItem key={m.name} component={Link} to={m.path}>
                  <FormattedMessage {...messages[`user${m.name}`]} />
                </MenuItem>
              ))}
              <Divider />
              <MenuItem onClick={logout}>
                <FormattedMessage {...messages.userLogout} />
              </MenuItem>
            </Menu>
            {clusterID && (
              <IconButton
                color="inherit"
                onClick={(evt) => toggleEventsView(!showEvents)}
              >
                <DownIcon
                  style={{
                    transform: `rotate(${showEvents ? 180 : 0}deg)`,
                  }}
                />
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
      openTerminal,
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
