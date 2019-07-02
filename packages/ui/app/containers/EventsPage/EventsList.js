/**
 *
 * Events List
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import NormalIcon from 'components/Icons/Normal';
import WarningIcon from 'components/Icons/Warning';

import { makeSelectClusterID } from 'ducks/app/selectors';
import { makeSelectEvents } from 'ducks/events/selectors';
import * as actions from 'ducks/events/actions';

import messages from './messages';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class EventsList extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    events: PropTypes.array,
  };

  render() {
    const { classes, clusterID, events } = this.props;
    const rEvents = events.reverse();

    return (
      <Paper className={classes.wrapper}>
        <List>
          <ListItem>
            <ListItemText>
              <Link to={`/clusters/${clusterID}/events`} >
                Link
              </Link>
            </ListItemText>
          </ListItem>
          <ReactCSSTransitionGroup
            transitionName="eventItem"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {rEvents.map((evt, i) => (
              <ListItem className={classes.item} key={evt.id}>
                <ListItemAvatar className={classes.itemAvatar}>
                  {evt.type === 'Warning' ? (
                    <WarningIcon
                      style={{
                        color: '#FF7A22',
                        transform: 'scale(0.85)',
                      }}
                    />
                  ) : (
                    <NormalIcon
                      style={{
                        color: '#1A435F',
                        transform: 'scale(0.85)',
                      }}
                    />
                  )}
                </ListItemAvatar>
                <ListItemText
                  className={classes.itemText}
                  primary={
                    <Typography className={classes.itemText1} component="div">
                      <Typography
                        className={classes.itemName}
                        component="div"
                        title={evt.name}
                      >
                        {evt.name}
                      </Typography>
                      <Typography
                        className={classes.itemReason}
                        component="div"
                        title={evt.reason}
                      >
                        {evt.reason}
                      </Typography>
                    </Typography>
                  }
                  secondary={
                    <Typography className={classes.itemText2} component="div">
                      <Typography
                        className={classes.itemMessage}
                        component="div"
                        title={evt.message}
                      >
                        {evt.message}
                      </Typography>
                      <Typography
                        className={classes.itemTime}
                        component="div"
                        title={evt.time}
                      >
                        {evt.time}
                      </Typography>
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </ReactCSSTransitionGroup>
        </List>
      </Paper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  events: makeSelectEvents(),
});

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
)(EventsList);
