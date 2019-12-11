/**
 *
 * Namespaces Table
 *
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';

import { makeSelectLocation } from 'ducks/app/selectors';
import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectNamespacesList } from 'ducks/namespaces/selectors';
import * as actions from 'ducks/namespaces/actions';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
const WorkloadGroupTable = ({
  location,
  // data,
  clusterID,
  namespaceID,
  removeNamespace,
  parentType,
}) => {
  const classes = useStyles();
  const pathname = location.get('pathname');
  let mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'name' ) {
        return {
          ...sch,
          props: { pathname },
        };
      }
      return sch;
    })
    .map((s) => ({
      ...s,
      label: <FormattedMessage {...messages[`tableTitle${s.label}`]} />,
    }));
    let data = [];
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
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  data: makeSelectNamespacesList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(WorkloadGroupTable);
