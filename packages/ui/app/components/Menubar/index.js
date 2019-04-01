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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer } from '@fortawesome/free-solid-svg-icons';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import styles from './styles';

function Menubar(props) {
  const { classes, headerContent } = props;

  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar disableGutters className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="single cloud"
          className={classes.menuButton}
        >
          <FontAwesomeIcon icon={faServer} />
        </IconButton>
        {headerContent}
      </Toolbar>
    </AppBar>
  );
}

Menubar.propTypes = {
  classes: PropTypes.object.isRequired,
  headerContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default withStyles(styles)(Menubar);
