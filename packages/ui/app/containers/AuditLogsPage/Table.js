/**
 *
 * AuditLogs Table
 *
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';

import {
  makeSelectLocation,
} from 'ducks/app/selectors';
import {
  makeSelectAuditLogsList,
} from 'ducks/auditLogs/selectors';
import * as actions from 'ducks/auditLogs/actions';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
const AuditLogsTable = ({
  location,
  data,
  removeAuditLog,
}) => {
  const classes = useStyles();
  const pathname = location.get('pathname');
  const mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'detail') {
        return {
          ...sch,
          props: { classes},
        };
      };
      if (sch.id === 'resourcePath') {
        return {
          ...sch,
          props: {classes},
        };
      }
      return sch;
    })
    .map((s) => ({
      ...s,
      label: <FormattedMessage {...messages[`tableTitle${s.label}`]} />,
    }));

  return (
    <Paper className={classes.tableWrapper}>
      <SimpleTable
        className={classes.table}
        schema={mergedSchema}
        data={data}
      />
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  data: makeSelectAuditLogsList(),
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
)(AuditLogsTable);
