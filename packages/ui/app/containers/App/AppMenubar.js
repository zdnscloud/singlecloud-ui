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
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import EventIcon from '@material-ui/icons/Event';
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

import dashboardStyle from 'assets/jss/material-dashboard-react/layouts/dashboardStyle';

import SelectCluster from './SelectCluster';
import SelectNamespace from '../NamespacesPage/SelectNamespace';
import * as actions from './actions';
import {
  makeSelectActiveCluster,
  makeSelectClusterID,
  makeSelectShowEvents,
  makeSelectLocation,
  makeSelectUserMenus,
} from './selectors';
import { makeSelectClusters } from '../ClustersPage/selectors';

class AppMenubar extends PureComponent {
  static defaultProps = {
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
    } = this.props;
    const { userEl } = this.state;

    return (
      <Menubar
        headerLeftContent={
          <Fragment>
            <SelectCluster
              clusters={clusters}
              changeCluster={changeCluster}
              activeCluster={clusterID}
            />
            {clusterID && (
              <SelectNamespace />
            )}
          </Fragment>
        }
        headerRightContent={
          <Fragment>
            {clusterID && (
              <IconButton onClick={(evt) => toggleEventsView(!showEvents)}>
                <EventIcon />
              </IconButton>
            )}
            <IconButton onClick={(evt) => this.openUserMenu(evt)}>
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
            </Menu>
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
)(AppMenubar);
