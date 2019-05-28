import React, { createRef, Fragment, PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { NavLink } from 'react-router-dom';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Popover from '@material-ui/core/Popover';
import Popper from '@material-ui/core/Popper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChevronRight from 'components/Icons/ChevronRight';

import messages from './messages';
import * as actions from './actions';
import {
  makeSelectActiveCluster,
  makeSelectLeftMenus,
  makeSelectClusterID,
  makeSelectShowEvents,
  makeSelectLocation,
  makeSelectShowMenuText,
} from './selectors';
import styles from './LeftMenuStyle';

class LeftMenu extends PureComponent {

  state = {
    openingMenu: null,
  };

  menuRef = createRef();

  render() {
    const {
      classes,
      logo,
      image,
      logoText,
      menus,
      showText,
      location,
    } = this.props;

    const color = 'orange';
    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName) => {
      const pathname = location.get('pathname');
      return pathname === routeName;
    };
    const handleOpen = (name) => () => {
      this.setState({ openingMenu: name });
    };
    const handleClose = () => {
      this.setState({ openingMenu: null });
    };

    const links = (
      <List className={classes.list} onMouseLeave={handleClose}>
        {menus.map((prop, key) => {
          const msgName = messages[`leftMenu${prop.name}`];

          if (prop.path) {
            const listItemClasses = classNames({
              [` ${classes.activeMenu1}`]: activeRoute(prop.path),
            });

            return (
              <NavLink
                to={prop.path}
                className={classes.item}
                onMouseEnter={handleOpen(prop.name)}
                activeClassName="active"
                key={key}
              >
                <ListItem button className={classes.itemLink + listItemClasses}>
                  {prop.icon ? (
                    <ListItemIcon>
                      <prop.icon nativeColor={'#fff'} />
                    </ListItemIcon>
                  ): null}
                  {showText ? (
                    <ListItemText
                      primary={<FormattedMessage {...msgName} />}
                      className={classNames(classes.itemText)}
                      disableTypography
                    />
                  ) : null}
                </ListItem>
              </NavLink>
            );
          }

          let active = false;
          if (prop.children) {
            prop.children.forEach((m) => {
              if (activeRoute(m.path)) active = true;
            });
          }
          const listItemClasses = classNames({
            [` ${classes.activeMenu1}`]: active,
          });

          return (
            <Fragment key={key}>
              <ListItem
                button
                className={classes.itemLink + listItemClasses}
                onMouseEnter={handleOpen(prop.name)}
                /* onMouseLeave={handleClose} */
              >
                {prop.icon ? (
                  <ListItemIcon>
                    <prop.icon nativeColor={'#fff'} />
                  </ListItemIcon>
                ) : null}
                {showText ? (
                  <ListItemText
                    primary={<FormattedMessage {...msgName} />}
                    className={classNames(classes.itemText)}
                    disableTypography
                    style={{
                      opacity: active ? 1 : 0.7,
                    }}
                  />
                ) : null}
                {prop.children ? (
                  <ListItemSecondaryAction>
                    <ChevronRight
                      style={{
                        transform: 'scale(0.6)',
                        opacity: active ? 1 : 0.7,
                      }}
                    />
                  </ListItemSecondaryAction>
                ) : null}
              </ListItem>
              {prop.name === this.state.openingMenu && prop.children ? (
                <Popover
                  open={prop.name === this.state.openingMenu}
                  onClose={handleClose}
                  anchorEl={this.menuRef.current}
                  anchorReference="none"
                  ModalClasses={{
                    root: classNames(classes.secondMenuModal, {
                      [classes.menuShrinkModal]: !showText,
                    }),
                  }}
                  PaperProps={{
                    square: true,
                    style: {
                      maxHeight: '100vh',
                      boxShadow: 'none',
                    },
                  }}
                  transitionDuration={0}
                  hideBackdrop
                >
                  <div
                    className={classNames(classes.secondMenu)}
                    onMouseLeave={handleClose}
                  >
                    <List component="div" disablePadding>
                      {prop.children.map((menu, idx) => {
                        const itemClasses = classNames({
                          [` ${classes.activeMenu2}`]: activeRoute(menu.path),
                        });
                        const msgSubName = messages[`leftMenu${menu.name}`];

                        return (
                          <NavLink
                            to={menu.path}
                            className={classes.item}
                            activeClassName="active"
                            key={idx}
                          >
                            <ListItem
                              button
                              className={classNames(
                                classes.itemLink,
                                classes.nested,
                                itemClasses
                              )}
                            >
                              <ListItemText
                                primary={<FormattedMessage {...msgSubName} />}
                                className={classNames(classes.itemText)}
                                disableTypography
                              />
                            </ListItem>
                          </NavLink>
                        );
                      })}
                    </List>
                  </div>
                </Popover>
              ) : null}
            </Fragment>
          );
        })}
      </List>
    );
    const brand = <div className={classes.logo} />;
    return (
      <div className={classes.root}>
        <Drawer
          open
          anchor="left"
          variant="permanent"
          classes={{
            root: classes.root,
            paper: classNames(classes.drawerPaper, {
              [classes.menuShrink]: !showText,
            }),
          }}
        >
          {brand}
          <div
            className={classNames(classes.sidebarWrapper, {
              [classes.menuShrink]: !showText,
            })}
            ref={this.menuRef}
          >
            {links}
          </div>
          <div className={classes.background} />
        </Drawer>
      </div>
    );
  }
}

LeftMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  activeCluster: makeSelectActiveCluster(),
  menus: makeSelectLeftMenus(),
  clusterID: makeSelectClusterID(),
  location: makeSelectLocation(),
  showText: makeSelectShowMenuText(),
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
  withStyles(styles),
  withConnect,
)(LeftMenu);
