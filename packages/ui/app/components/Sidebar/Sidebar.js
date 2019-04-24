import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
// core components
// import AdminNavbarLinks from 'components/Navbars/AdminNavbarLinks';
// import RTLNavbarLinks from 'components/Navbars/RTLNavbarLinks';

import styles from './styles';

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1;
  }
  const { classes, color, logo, image, logoText, routes } = props;
  const links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        const listItemClasses = classNames({
          [` ${classes[color]}`]: activeRoute(prop.path),
        });
        const whiteFontClasses = classNames({
          [` ${classes[color]}`]: activeRoute(prop.path),
        });
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
            </ListItem>
          </NavLink>
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

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);
