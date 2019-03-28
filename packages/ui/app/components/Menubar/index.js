/**
 *
 * Menubar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloudIcon from '@material-ui/icons/Cloud';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import styles from './styles';

function Menubar(props) {
  const { classes, headerText } = props;

  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar disableGutters className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="single cloud"
          className={classes.menuButton}
        >
          <CloudIcon />
        </IconButton>
        <Typography
          component="div"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {headerText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

Menubar.propTypes = {
  classes: PropTypes.object.isRequired,
  headerText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default withStyles(styles)(Menubar);
