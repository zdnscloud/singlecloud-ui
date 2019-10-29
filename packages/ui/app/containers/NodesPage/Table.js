/**
 *
 * NodesPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { SimpleTable } from '@gsmlg/com';

import { makeSelectNodes, makeSelectNodesList } from 'ducks/nodes/selectors';
import { makeSelectLocation } from 'ducks/app/selectors';
import * as actions from 'ducks/nodes/actions';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
const NodesTable = ({ location, data, clusterID, executeNodeAction }) => {
  const classes = useStyles();
  const pathname = location.get('pathname');
  const mapedSchema = schema
    .map((sche) => ({
      ...sche,
      label: <FormattedMessage {...messages[`tableTitle${sche.label}`]} />,
    }))
    .map((sch) => {
      if (sch.id === 'actions') {
        return {
          ...sch,
          props: { classes, executeNodeAction },
        };
      }
      if (sch.id === 'name') {
        return {
          ...sch,
          props: { pathname },
        };
      }
      return sch;
    });

  return (
    <Paper className={classes.tableWrapper}>
      <SimpleTable className={classes.table} schema={mapedSchema} data={data} />
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectNodesList(),
  location: makeSelectLocation(),
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

export default compose(withConnect)(NodesTable);
