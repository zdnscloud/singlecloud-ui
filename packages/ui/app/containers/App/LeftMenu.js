import React, { useRef, Fragment, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { NavLink } from 'react-router-dom';

// @material-ui/core components
import Drawer from '@material-ui/core/Drawer';
import Popper from '@material-ui/core/Popper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import logoICon from 'images/logo.svg';
import ZcloudICon from 'images/Zcloud.svg';

import * as actions from 'ducks/app/actions';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import {
  makeSelectLeftMenus,
  makeSelectShowEvents,
  makeSelectLocation,
  makeSelectShowMenuText,
} from 'ducks/app/selectors';

import messages from './messages';
import useStyles from './LeftMenuStyle';
import OutLinks from './OutLinks';

let timer = null;
let ctimer = null;

const LeftMenu = ({
  logo,
  image,
  logoText,
  menus,
  showText,
  location,
  clusterID,
}) => {
  const path = location.get('pathname');
  const isManage = /^\/clusters\/[^/]+\/manage/.test(path);
  const classes = useStyles({ showText });
  const menuRef = useRef(null);
  const [openingMenu, setOpeningMenu] = useState(null);
  const [popperTop, setPopperTop] = useState(0);
  const popperRef = useCallback((el) => {
    if (el) {
      setTimeout(() => {
        const rect = el.getBoundingClientRect();
        const { top, height } = rect;
        const overflow = top + height - window.innerHeight;
        if (overflow > 0) {
          setPopperTop(-overflow);
        }
      }, 1000 / 60);
    } else {
      setPopperTop(0);
    }
  }, []);
  useEffect(() => {
    setOpeningMenu(null);
  }, [showText]);

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    const pathname = location.get('pathname');
    return pathname === routeName;
  };
  const handleOpen = (name, notChange) => ({ currentTarget }) => {
    clearTimeout(ctimer);
    ctimer = null;
    clearTimeout(timer);
    timer = null;
    const setTarget = notChange ? openingMenu && openingMenu[1] : currentTarget;
    timer = setTimeout(() => {
      setOpeningMenu([name, setTarget]);
    }, 200);
  };
  const handleClose = () => {
    clearTimeout(ctimer);
    ctimer = null;
    ctimer = setTimeout(() => {
      setOpeningMenu(null);
      clearTimeout(timer);
      timer = null;
    }, 200);
  };

  const links = (
    <List className={classes.list} onMouseLeave={handleClose}>
      {menus.map((prop, key) => {
        const msgName = messages[`leftMenu${prop.name}`];
        if (prop.path) {
          const listItemClasses = classNames({
            [` ${classes.active}`]: activeRoute(prop.path),
            [` ${classes.activeTile}`]: activeRoute(prop.path),
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
                  <ListItemIcon className={classes.itemIcon}>
                    <prop.icon fontSize="small" />
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
          [` ${classes.active}`]: active,
          [` ${classes.activeTile}`]: active,
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
                <ListItemIcon className={classes.itemIcon}>
                  <prop.icon fontSize="small" />
                </ListItemIcon>
              ) : null}
              <ListItemText
                primary={<FormattedMessage {...msgName} />}
                className={classNames(classes.itemText)}
                disableTypography
              />
            </ListItem>
            {openingMenu && prop.name === openingMenu[0] && prop.children ? (
              <Popper
                open={prop.name === openingMenu[0]}
                onMouseEnter={handleOpen(prop.name, true)}
                onMouseMove={handleOpen(prop.name, true)}
                onClose={handleClose}
                anchorEl={openingMenu && openingMenu[1]}
                placement={'right-start'}
                style={{ zIndex: 1200, top: popperTop }}
              >
                <div
                  ref={popperRef}
                  className={classNames(classes.secondMenu)}
                >
                  <List component="div" disablePadding>
                    {prop.children.map((menu, idx) => {
                      const itemClasses = classNames({
                        [` ${classes.active}`]: activeRoute(menu.path),
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
                            onClick={() => {
                              setOpeningMenu(null);
                              clearTimeout(timer);
                              timer = null;
                            }}
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
      <div className={classes.logoWrap}>
        <div className={classes.logoIconWrapper}>
          <img src={logoICon} alt="logo" className={classes.logoIcon} />
        </div>
        <img src={ZcloudICon} alt="Zcloud" className={classes.logoName} />
      </div>
      <div className={classes.sidebarWrapper} ref={menuRef}>
        {links}
        {clusterID !== '' && !isManage ? <OutLinks /> : null}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectCurrentClusterID(),
  menus: makeSelectLeftMenus(),
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

export default compose(withConnect)(LeftMenu);
