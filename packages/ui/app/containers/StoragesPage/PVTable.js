/**
 *
 * PV Table
 *
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';

import messages from './messages';
import useStyles from './styles';
import schema from './pvTableSchema';

/* eslint-disable react/prefer-stateless-function */
export const PVTable = ({ data }) => {
  const classes = useStyles();
  const mergedSchema = schema.map((s) => ({
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

export default PVTable;
