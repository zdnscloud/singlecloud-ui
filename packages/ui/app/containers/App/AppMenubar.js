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

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
// core components
import Menubar from 'components/Menubar';
import DownIcon from 'components/Icons/Down';
import ShellIcon from 'components/Icons/Shell';
import AccountIcon from 'components/Icons/Account';

import { makeSelectRole } from 'ducks/role/selectors';
import * as roleActions from 'ducks/role/actions';
import * as termActions from 'containers/TerminalPage/actions';
import * as actions from 'ducks/app/actions';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import {
  makeSelectShowEvents,
  makeSelectLocation,
  makeSelectUserMenus,
  makeSelectShowMenuText,
} from 'ducks/app/selectors';

import SelectMenu from './SelectMenu';
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
      clusterID,
      showEvents,
      toggleEventsView,
      role,
      userMenus,
      logout,
      showMenuText,
      toggleMenuText,
      openTerminal,
      location,
    } = this.props;
    const { userEl } = this.state;
    const path = location.get('pathname');
    const isManage = /^\/clusters\/[^/]+\/manage/.test(path);

    return (
      <Menubar
        showMenuText={showMenuText}
        onClickMenuButton={(evt) => toggleMenuText(!showMenuText)}
        headerLeftContent={
          <Fragment>
            <SelectMenu />
          </Fragment>
        }
        headerRightContent={
          <Fragment>
            {clusterID && !isManage && (
              <IconButton
                color="inherit"
                onClick={() => openTerminal(clusterID)}
              >
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
            {clusterID && !isManage && (
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
  clusterID: makeSelectCurrentClusterID(),
  showEvents: makeSelectShowEvents(),
  location: makeSelectLocation(),
  role: makeSelectRole(),
  userMenus: makeSelectUserMenus(),
  showMenuText: makeSelectShowMenuText(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      openTerminal: termActions.openTerminal,
      logout: roleActions.logout,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(AppMenubar);
