import React, {
  useRef,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from 'react';
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

import ChevronRight from 'components/Icons/ChevronRight';

import * as actions from 'ducks/app/actions';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';

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
  namespaceID,
}) => {
  const path = location.get('pathname');

  const isManage = /^\/clusters\/[^/]+\/manage/.test(path);
  const isShow = /\/show$/.test(path);
  const isEdit = /\/edit$/.test(path);
  const isLogs = /\/logs$/.test(path);
  const isUpdate = /\/update$/.test(path);
  const isCreate = /\/create$/.test(path);
  const isCCreate = /^\/clusters+\/create/.test(path);
  const isNsCreate = path === `/clusters/${clusterID}/namespaces/create`;
  const isNsShow =
    path === `/clusters/${clusterID}/namespaces/${namespaceID}/show`;

  const classes = useStyles({ showText });
  const menuRef = useRef(null);
  const [openingMenu, setOpeningMenu] = useState(null);
  const [popperTop, setPopperTop] = useState(0);
  const [hidden, setHidden] = useState('inherit');
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
    const rnIsClusters = routeName === '/clusters';
    const rnIsGlobalConfig = routeName === '/globalConfiguration';
    const rnIsAuditLogs = routeName === '/auditLogs';
    const rnIsNS = routeName === `/clusters/${clusterID}/namespaces`;
    if (!rnIsClusters) {
      if (!clusterID) {
        if (rnIsGlobalConfig || rnIsAuditLogs) {
          return path.includes(routeName);
        }
        return path.includes('adminUserQuotas') || path.includes('userQuotas');
      }
      if (
        ((isShow || isCreate || isEdit || isUpdate || isLogs) && !rnIsNS) ||
        isNsCreate ||
        isNsShow
      ) {
        return path.includes(routeName);
      }
    }
    if (isManage || isCCreate) {
      return path.includes(routeName);
    }
    if (path === routeName) {
      return true;
    }
    return false;
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
    <List
      className={classes.list}
      onMouseLeave={handleClose}
      onMouseEnter={() => {
        setHidden('inherit');
      }}
    >
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
              <ChevronRight  
                className={classNames(classes.itemText)} 
                style={{
                  fontSize: 16,
                }}
              />
            </ListItem>
            {openingMenu && prop.name === openingMenu[0] && prop.children ? (
              <Popper
                open={prop.name === openingMenu[0]}
                onMouseEnter={handleOpen(prop.name, true)}
                onMouseMove={handleOpen(prop.name, true)}
                onClose={handleClose}
                anchorEl={openingMenu && openingMenu[1]}
                placement="right-start"
                style={{ zIndex: 1200, top: popperTop, visibility: hidden }}
              >
                <div ref={popperRef} className={classNames(classes.secondMenu)}>
                  <List component="div" disablePadding>
                    {prop.name === 'SystemTools' ? (
                      <OutLinks
                        handleClose={handleClose}
                        setHidden={setHidden}
                      />
                    ) : (
                      prop.children.map((menu, idx) => {
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
                      })
                    )}
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
      <div className={classes.sidebarWrapper} ref={menuRef}>
        {links}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectNamespaceID(),
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

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LeftMenu);
