import React, { useRef, Fragment, useState } from 'react';
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
import Popper from '@material-ui/core/Popper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ChevronRight from 'components/Icons/ChevronRight';
import logoICon from 'images/logo.svg';

import * as actions from 'ducks/app/actions';
import {
  makeSelectActiveCluster,
  makeSelectLeftMenus,
  makeSelectClusterID,
  makeSelectShowEvents,
  makeSelectLocation,
  makeSelectShowMenuText,
} from 'ducks/app/selectors';

import messages from './messages';
import styles from './LeftMenuStyle';

let timer = null;
let ctimer = null;

const LeftMenu = ({
  classes,
  logo,
  image,
  logoText,
  menus,
  showText,
  location,
}) => {
  const menuRef = useRef(null);
  const [openingMenu, setOpeningMenu] = useState(null);

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    const pathname = location.get('pathname');
    return pathname === routeName;
  };
  const handleOpen = (name) => () => {
    clearTimeout(ctimer);
    ctimer = null;
    clearTimeout(timer);
    timer = null;
    timer = setTimeout(() => {
      setOpeningMenu(name);
    }, 200);
  };
  const handleClose = () => {
    clearTimeout(ctimer);
    ctimer = null;
    ctimer = setTimeout(() => {
      setOpeningMenu(null);
      clearTimeout(timer);
      timer = null;
    }, 500);
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
              onMouseMove={handleOpen(prop.name)}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                {prop.icon ? (
                  <ListItemIcon>
                    <prop.icon
                      style={{ color: '#fff', transform: 'scale(0.8334)' }}
                    />
                  </ListItemIcon>
                ) : null}
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
              onMouseMove={handleOpen(prop.name)}
              onMouseLeave={handleClose}
            >
              {prop.icon ? (
                <ListItemIcon>
                  <prop.icon
                    style={{ color: '#fff', transform: 'scale(0.8334)' }}
                  />
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
                <ListItemSecondaryAction
                  onMouseEnter={handleOpen(prop.name)}
                  onMouseMove={handleOpen(prop.name)}
                  style={{ right: showText ? 16 : 0 }}
                  className={classes.itemSecondaryAction}
                >
                  <ChevronRight
                    style={{
                      transform: 'scale(0.6)',
                      opacity: active ? 1 : 0.7,
                    }}
                  />
                </ListItemSecondaryAction>
              ) : null}
            </ListItem>
            {prop.name === openingMenu && prop.children ? (
              <Popper
                open={prop.name === openingMenu}
                onMouseEnter={handleOpen(prop.name)}
                onMouseMove={handleOpen(prop.name)}
                onClose={handleClose}
                anchorEl={menuRef.current}
                placement="right-start"
                style={{ zIndex: 1300 }}
              >
                <div className={classNames(classes.secondMenu)}>
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
              </Popper>
            ) : null}
          </Fragment>
        );
      })}
    </List>
  );
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
        <div
          className={classNames(classes.sidebarWrapper, {
            [classes.menuShrink]: !showText,
          })}
          ref={menuRef}
        >
          {links}
        </div>
        <div className={classes.background} />
      </Drawer>
    </div>
  );
};

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
  withConnect
)(LeftMenu);
