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

import { makeSelectEvents } from './selectors';
import * as actions from './actions';
import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export class EventsList extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    events: PropTypes.object,
  };

  render() {
    const { classes, events } = this.props;
    const mergedSchema = schema.concat([]);

    return (
      <Paper className={classes.wrapper}>
        <List>
          {events.reverse().map((evt, i) => {
            return (
              <ListItem className={classes.item} key={i}>
                <ListItemAvatar className={classes.itemAvatar}>
                  {evt.type === 'Warning' ? (
                    <WarningIcon nativeColor="#FF7A22" />
                  ) : (
                    <NormalIcon nativeColor="#1A435F" />
                  )}
                </ListItemAvatar>
                <ListItemText
                  className={classes.itemText}
                  primary={
                    <Typography className={classes.itemText1} component="div">
                      <Typography className={classes.itemName} component="div">
                        {evt.name}
                      </Typography>
                      <Typography className={classes.itemReason} component="div">
                        {evt.reason}
                      </Typography>
                    </Typography>
                  }
                  secondary={
                    <Typography className={classes.itemText2} component="div">
                      <Typography className={classes.itemMessage} component="div">
                        {evt.message}
                      </Typography>
                      <Typography className={classes.itemTime} component="div">
                        {evt.time}
                      </Typography>
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
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
