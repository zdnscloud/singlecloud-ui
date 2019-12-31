/**
 *
 * AppMenubar
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useState, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

// @material-ui/core components
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
// core components
import Snackbar from 'components/Snackbar/Snackbar';
import Menubar from 'components/Menubar';
import DownIcon from 'components/Icons/Down';
import ShellIcon from 'components/Icons/Shell';
import AccountIcon from 'components/Icons/Account';
import AlarmIcon from 'components/Icons/Alarm';

import * as roleActions from 'ducks/role/actions';
import * as actions from 'ducks/app/actions';
import * as alarmsActions from 'ducks/alarms/actions';
import { makeSelectRole } from 'ducks/role/selectors';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import {
  makeSelectShowEvents,
  makeSelectLocation,
  makeSelectUserMenus,
  makeSelectShowMenuText,
} from 'ducks/app/selectors';
import {
  makeSelectUnreadCount,
  makeSelectNewAlarms,
} from 'ducks/alarms/selectors';

import SelectMenu from './SelectMenu';
import messages from './messages';

const AppMenubar = ({
  unreadCount,
  newAlarms,
  removeNewAlarm,
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
}) => {
  const [userEl, setUserEl] = useState(null);
  const path = location.get('pathname');
  const isManage = /^\/clusters\/[^/]+\/manage/.test(path);

  return (
    <Menubar
      showMenuText={showMenuText}
      onClickMenuButton={(evt) => toggleMenuText(!showMenuText)}
      headerLeftContent={<SelectMenu />}
      headerRightContent={
        <Fragment>
          {clusterID && !isManage && (
            <IconButton onClick={() => openTerminal('cluster', { clusterID })}>
              <ShellIcon />
            </IconButton>
          )}
          <Link to="/alarms">
            <IconButton>
              <Badge badgeContent={unreadCount}>
                <AlarmIcon />
              </Badge>
            </IconButton>
          </Link>
          {newAlarms.map((alarm) => (
            <Snackbar
              key={alarm.get('id')}
              color="danger"
              place="tr"
              message={alarm.get('message')}
              open
              close
              closeNotification={() => {
                removeNewAlarm(alarm.get('id'));
              }}
            />
          ))}
          <IconButton onClick={(evt) => setUserEl(evt.currentTarget)}>
            <AccountIcon />
            <small style={{ fontSize: '14px' }}>{role.get('user')}</small>
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={userEl}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={Boolean(userEl)}
            onClose={(evt) => setUserEl(null)}
          >
            {userMenus.map((m, index) => (
              <MenuItem
                key={m.name}
                component={Link}
                to={m.path}
                onClick={() => setUserEl(null)}
              >
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
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectCurrentClusterID(),
  showEvents: makeSelectShowEvents(),
  location: makeSelectLocation(),
  role: makeSelectRole(),
  userMenus: makeSelectUserMenus(),
  showMenuText: makeSelectShowMenuText(),
  unreadCount: makeSelectUnreadCount(),
  newAlarms: makeSelectNewAlarms(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...alarmsActions,
      ...roleActions,
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AppMenubar);
