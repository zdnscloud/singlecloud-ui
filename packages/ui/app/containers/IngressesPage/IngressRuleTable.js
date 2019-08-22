/**
 *
 * Ingress Table
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

import * as actions from 'ducks/ingresses/actions';

import messages from './messages';
import useStyles from './styles';
import schema from './ruleTableSchema';

/* eslint-disable react/prefer-stateless-function */
const IngressRuleTable = ({
  ingress,
}) => {
  const classes = useStyles();
  const mergedSchema = schema
    .map((s) => ({
      ...s,
      label: <FormattedMessage {...messages[`form${s.label}`]} />,
    }));

  return (
    <Paper className={classes.tableWrapper}>
      <SimpleTable
        className={classes.table}
        schema={mergedSchema}
        data={ingress.get('rules') || []}
      />
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
 
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

export default compose(withConnect)(IngressRuleTable);
