/**
 *
 * EventsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import SockJS from 'sockjs-client';

import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import * as actions from 'ducks/events/actions';

import messages from './messages';
import styles from './styles';
import EventsTable from './EventsTable';
import EventsPageHelmet from './helmet';

/* eslint-disable react/prefer-stateless-function */
export class EventsPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  componentWillMount() {}

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <EventsPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography component="div" className={classes.chartContainer}>
            <EventsTable location={this.props.location} />
          </Typography>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(EventsPage);
