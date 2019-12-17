/**
 *
 * SvcMeshWorkloads Table
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
import {
  makeSelectCurrent,
  makeSelectCurrentID,
} from 'ducks/svcMeshWorkloads/selectors';
import * as actions from 'ducks/svcMeshWorkloads/actions';
import { makeSelectCurrentID as makeSelectSvcMeshWorkloadGroupID } from 'ducks/svcMeshWorkloadGroups/selectors';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
const SvcMeshWorkloadsTable = ({
  location,
  clusterID,
  namespaceID,
  parentType,
  current,
  svcMeshWorkloadGroupID,
  svcMeshWorkloadID,
}) => {
  const classes = useStyles();
  const pods = current.get('pods') || [];
  const inbound = current.get('inbound') || [];
  const outbound = current.get('outbound') || [];
  let mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'actions') {
        return {
          ...sch,
          props: {
            clusterID,
            namespaceID,
            svcMeshWorkloadGroupID,
            svcMeshWorkloadID,
          },
        };
      }
      if (sch.id === 'pods') {
        return {
          ...sch,
          props: {
            clusterID,
            namespaceID,
            svcMeshWorkloadGroupID,
            svcMeshWorkloadID,
          },
        };
      }
      if (sch.id === 'resource') {
        return {
          ...sch,
          props: {
            clusterID,
            namespaceID,
            svcMeshWorkloadGroupID,
            svcMeshWorkloadID,
            pods,
          },
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
    case 'inbound':
      data = inbound;
      mergedSchema = _.drop(mergedSchema, 1).filter(
        (s) =>
          s.id !== 'connections' &&
          s.id !== 'readBytes' &&
          s.id !== 'writeBytes'
      );
      break;
    case 'outbound':
      data = outbound;
      mergedSchema = _.drop(mergedSchema, 1).filter(
        (s) =>
          s.id !== 'connections' &&
          s.id !== 'readBytes' &&
          s.id !== 'writeBytes'
      );
      break;
    case 'pods':
      data = pods;
      mergedSchema = _.dropRight(mergedSchema, 4).filter(
        (s) => s.id !== 'resource'
      );
      break;
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
  svcMeshWorkloadID: makeSelectCurrentID(),
  svcMeshWorkloadGroupID: makeSelectSvcMeshWorkloadGroupID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SvcMeshWorkloadsTable);
