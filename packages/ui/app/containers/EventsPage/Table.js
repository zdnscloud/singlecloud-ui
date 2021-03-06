/**
 *
 * Events Table
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

import { makeSelectEvents } from 'ducks/events/selectors';
import * as actions from 'ducks/events/actions';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

const EventsTable = ({ events, filters }) => {
  const classes = useStyles();
  const allFilter = '__all__';
  const mergedSchema = schema.map((s) => ({
    ...s,
    label: <FormattedMessage {...messages[`tableTitle${s.label}`]} />,
  }));

  return (
    <Paper className={classes.tableWrapper}>
      <SimpleTable
        className={classes.table}
        schema={mergedSchema}
        data={events
          .filter((evt) => {
            let flag = true;
            if (filters.get('type') !== allFilter) {
              flag = flag && filters.get('type') === evt.type;
            }
            if (filters.get('namespace') !== allFilter) {
              flag = flag && filters.get('namespace') === evt.namespace;
            }
            if (filters.get('kind') !== allFilter) {
              flag = flag && filters.get('kind') === evt.kind;
            }
            if (filters.get('name') !== allFilter) {
              flag = flag && filters.get('name') === evt.name;
            }
            return flag;
          })
          .reverse()}
      />
    </Paper>
  );
};

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

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(EventsTable);
