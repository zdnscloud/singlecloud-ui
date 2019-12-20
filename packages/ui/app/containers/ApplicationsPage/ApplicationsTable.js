/* eslint-disable no-unreachable */
/**
 *
 * Applications Table
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Map, List } from 'immutable';

import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';

import * as actions from 'ducks/applications/actions';
import { makeSelectCurrent } from 'ducks/applications/selectors';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

export const ApplicationsTable = ({ application, clusterID, namespaceID }) => {
  const classes = useStyles();
  const data = application.get('appResources') || List([]);
  const mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'actions') {
        return {
          ...sch,
          props: {
            clusterID,
            namespaceID,
          },
        };
      }
      if (sch.id === 'name') {
        return {
          ...sch,
          props: { clusterID, namespaceID },
        };
      }
      if (sch.id === 'exists') {
        return {
          ...sch,
          props: { data, classes },
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
  application: makeSelectCurrent(),
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ApplicationsTable);
