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
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Helmet from 'components/Helmet/Helmet';

import img404 from 'images/404.png';

import NotFoundCard from './Card';
import messages from './messages';
import useStyles from './styles';

/* eslint-disable react/prefer-stateless-function */
const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <NotFoundCard />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};
export default NotFound;
