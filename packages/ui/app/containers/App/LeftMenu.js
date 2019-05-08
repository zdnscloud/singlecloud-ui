import React, { Fragment } from 'react';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import * as actions from './actions';
import {
  makeSelectActiveCluster,
  makeSelectMenus,
  makeSelectLeftMenus,
  makeSelectClusterID,
  makeSelectShowEvents,
  makeSelectLocation,
} from './selectors';
import styles from './LeftMenuStyle';

const LeftMenu = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    const pathname = props.location.get('pathname');
    return pathname.indexOf(routeName) > -1;
  }
  const { classes, color, logo, image, logoText, menus } = props;
  const links = (
    <List className={classes.list}>
      {menus.map((prop, key) => {
        const listItemClasses = classNames({
          [` ${classes[color]}`]: activeRoute(prop.path),
        });
        const whiteFontClasses = classNames({
          [` ${classes[color]}`]: activeRoute(prop.path),
        });

        if ( prop.path ) {
          return (
            <NavLink
              to={prop.path}
              className={classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                <ListItemText
                  primary={prop.name}
                  className={classNames(classes.itemText)}
                  disableTypography
                />
                {prop.children ? (
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="ExpandLess">
                      <ExpandLess />
                    </IconButton>
                  </ListItemSecondaryAction>
                ) : null}
              </ListItem>
            </NavLink>
          );
        }
        const [open, setOpen] = React.useState(false);
        const handleClick = () => {
          setOpen(!open);
        };

        return (
          <Fragment>
            <ListItem
              button
              className={classes.itemLink + listItemClasses}
              onClick={handleClick}
            >
              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText)}
                disableTypography
              />
              {prop.children ? (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label={open ? 'ExpandLess' : 'ExpandMore'}
                    onClick={handleClick}
                  >
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </ListItemSecondaryAction>
              ) : null}
            </ListItem>
            {prop.children ? (
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {prop.children.map((menu, idx) => {
                    const itemClasses = classNames({
                      [` ${classes[color]}`]: activeRoute(menu.path),
                    });

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
                            itemClasses,
                          )}
                        >
                          <ListItemText
                            primary={menu.name}
                            className={classNames(classes.itemText)}
                            disableTypography
                          />
                        </ListItem>
                      </NavLink>
                    );
                  })}
                </List>
              </Collapse>
            ) : null}
          </Fragment>
        );
      })}
    </List>
  );
  const brand = <div className={classes.logo} />;
  return (
    <div className={classes.root}>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            root: classes.root,
            paper: classNames(classes.drawerPaper),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          <div className={classes.background} />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            root: classes.root,
            paper: classNames(classes.drawerPaper),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          <div className={classes.background} />
        </Drawer>
      </Hidden>
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
