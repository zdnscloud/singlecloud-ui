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

import logoICon from 'images/logo.svg';
import ZcloudICon from 'images/Zcloud.svg';

import MenuIcon from 'components/Icons/Menu';
import Brand from 'components/Brand/Brand';

import styles from './styles';

function Menubar({
  classes,
  headerLeftContent,
  headerRightContent,
  onClickMenuButton,
  showMenuText,
}) {
  return (
    <AppBar className={classes.appBar}>
      <Toolbar disableGutters className={classes.toolbar}>
        <div className={classes.toolbarLeft}>
          <div className={classes.menuButton}>
            <IconButton onClick={onClickMenuButton}>
              <MenuIcon color="inherit"  style={{transform : showMenuText ? 'rotate(0deg)':'rotate(180deg)' }}/>
            </IconButton>
          </div>
          <div className={classes.logoWrap}>
            <div className={classes.logoIconWrapper}>
              <img src={logoICon} alt="logo" className={classes.logoIcon} />
              <img src={ZcloudICon} alt="Zcloud" className={classes.logoName} />
            </div>
          </div>
          {headerLeftContent}
        </div>
        <div className={classes.toolbarRight}>{headerRightContent}</div>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Menubar);
