import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
// core components
import Button from 'components/CustomButtons/Button';
import headerStyle from 'assets/jss/material-dashboard-react/components/headerStyle';
import AdminNavbarLinks from './AdminNavbarLinks';
import RTLNavbarLinks from './RTLNavbarLinks';

function Header({ ...props }) {
  const { classes, color } = props;
  const appBarClasses = classNames({
    [` ${classes[color]}`]: color,
  });
  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar disableGutters className={classes.toolbar}>
        clusters
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
};

export default withStyles(headerStyle)(Header);
