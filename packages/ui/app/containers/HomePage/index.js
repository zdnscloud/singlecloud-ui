/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <div>
          <Button variant="contained" component={Link} to="/clusters" className={classes.button}>
            Clusters
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
