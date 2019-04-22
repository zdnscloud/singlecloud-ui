import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import logo from 'images/favicon.png';

import styles from './styles';

const Brand = ({ classes }) => (
  <div className={classes.logo}>
    <a href="https://www.zdns.cn" className={classNames(classes.logoLink)}>
      <div className={classes.logoImage}>
        <img src={logo} alt="logo" className={classes.img} />
      </div>
      ZCLOUD
    </a>
  </div>
);

Brand.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Brand);
