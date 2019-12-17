/**
 *
 * SvcMeshPods Table
 *
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';

import { makeSelectLocation } from 'ducks/app/selectors';
import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectCurrent } from 'ducks/svcMeshPods/selectors';
import * as actions from 'ducks/svcMeshPods/actions';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
const SvcMeshPodsTable = ({
  location,
  clusterID,
  namespaceID,
  parentType,
  current,
}) => {
  const classes = useStyles();
  const pods = current.get('pods') || [];
  const inbound = current.get('inbound') || [];
  const outbound = current.get('outbound') || [];
  let mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'successRate') {
        return {
          ...sch,
          props: { classes },
        };
      }
      if (sch.id === 'meshed') {
        return {
          ...sch,
          props: { parentType },
        };
      }
      if (sch.id === 'successRate') {
        return {
          ...sch,
          props: { classes, parentType },
        };
      }
      if (sch.id === 'RPS') {
        return {
          ...sch,
          props: { parentType },
        };
      }
      if (sch.id === 'latencyMsP50') {
        return {
          ...sch,
          props: { parentType },
        };
      }
      if (sch.id === 'latencyMsP95') {
        return {
          ...sch,
          props: { parentType },
        };
      }
      if (sch.id === 'latencyMsP99') {
        return {
          ...sch,
          props: { parentType },
        };
      }
      return sch;
    })
    .map((s) => ({
      ...s,
      label: <FormattedMessage {...messages[`tableTitle${s.label}`]} />,
    }));
  let data = [];
  // console.log('mergedSchema',mergedSchema)
  switch (parentType) {
    case 'tcp':
      data = pods;
      mergedSchema = mergedSchema.filter(
        (s) =>
          s.id === 'pods' ||
          s.id === 'meshed' ||
          s.id === 'connections' ||
          s.id === 'readBytes' ||
          s.id === 'writeBytes'
      );
      break;
    case 'inbound':
      data = [];
      mergedSchema = _.dropRight(_.drop(mergedSchema, 1), 3);
      break;
    case 'outbound':
      data = [];
      mergedSchema = _.dropRight(_.drop(mergedSchema, 1), 3);
      break;
    default:
      data = [];
  }
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
  current: makeSelectCurrent(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SvcMeshPodsTable);
