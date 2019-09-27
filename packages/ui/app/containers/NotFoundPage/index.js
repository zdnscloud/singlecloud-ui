/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';

import messages from './messages';
import useStyles from './styles';

/* eslint-disable react/prefer-stateless-function */
const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Menubar headerContent={<FormattedMessage {...messages.header} />} />
      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        <h1>404</h1>
      </div>
    </div>
  );
};
export default NotFound;
