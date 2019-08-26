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
import logo from 'images/page-logo.png';

import MenuIcon from 'components/Icons/Menu';
import Brand from 'components/Brand/Brand';

import styles from './styles';

function Menubar(props) {
  const {
    classes,
    headerLeftContent,
    headerRightContent,
    onClickMenuButton,
    showMenuText
  } = props;
  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar disableGutters className={classes.toolbar}>
        <div className={classes.toolbarLeft}   style={{ left: showMenuText ? 245 : 100 }}>
          <div className={classes.menuButton}>
            <IconButton style={{ color: '#fff' }} onClick={onClickMenuButton}>
              <MenuIcon color="inherit" />
            </IconButton>
          </div>
          {headerLeftContent}
        </div>
        <div className={classes.toolbarRight}>{headerRightContent}</div>
      </Toolbar>
    </AppBar>
  );
}

Menubar.propTypes = {
  classes: PropTypes.object.isRequired,
  headerContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default withStyles(styles)(Menubar);
