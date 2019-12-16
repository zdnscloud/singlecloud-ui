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
import { makeSelectSvcMeshPodsList } from 'ducks/svcMeshPods/selectors';
import * as actions from 'ducks/svcMeshPods/actions';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
const SvcMeshPodsTable = ({ location, clusterID, namespaceID, parentType }) => {
  const classes = useStyles();
  const pathname = location.get('pathname');
  let mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'pods') {
        return {
          ...sch,
          props: { pathname },
        };
      }
      if (sch.id === 'resource') {
        return {
          ...sch,
          props: { pathname },
        };
      }
      if (sch.id === 'successRate') {
        return {
          ...sch,
          props: { classes },
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
      data = [];
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
      mergedSchema = _.dropRight(_.drop(mergedSchema, 1), 4);
      break;
    case 'outbound':
      data = [];
      mergedSchema = _.dropRight(_.drop(mergedSchema, 1), 4);
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
  data: makeSelectSvcMeshPodsList(),
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
