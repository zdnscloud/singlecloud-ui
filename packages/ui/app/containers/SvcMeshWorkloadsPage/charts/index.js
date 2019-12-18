/**
 *
 * SvcMeshWorkloads Charts
 *
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import Grid from '@material-ui/core/Grid';

import { makeSelectLocation } from 'ducks/app/selectors';
import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import {
  makeSelectCurrent,
  makeSelectCurrentID,
} from 'ducks/svcMeshWorkloads/selectors';
import * as actions from 'ducks/svcMeshWorkloads/actions';
import { makeSelectCurrentID as makeSelectSvcMeshWorkloadGroupID } from 'ducks/svcMeshWorkloadGroups/selectors';

import messages from '../messages';
import useStyles from '../styles';
import Table from './table';
import { renderArrowCol } from './arrow';

/* eslint-disable react/prefer-stateless-function */
export const SvcMeshWorkloadsCharts = ({
  location,
  clusterID,
  namespaceID,
  parentType,
  current,
  svcMeshWorkloadGroupID,
  svcMeshWorkloadID,
}) => {
  const classes = useStyles();
  const inbound = current.get('inbound') || [];
  const outbound = current.get('outbound') || [];

  const renderResourceCard = (resource, type) => (
    <Grid>
      <Table data={resource} type={type} />
    </Grid>
  );

  const numUpstreams = inbound.size || 0;
  const numDownstreams = outbound.size || 0;

  return (
    <div className={classes.graphContainer}>
      <div className={classes.graph}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid
            container
            spacing={3}
            direction="column"
            justify="center"
            alignItems="center"
            item
            xs={3}
          >
            {inbound.size > 0 || inbound.length > 0
              ? inbound.map((n) => renderResourceCard(n, 'neighbor'))
              : null}
          </Grid>

          <Grid item xs={1}>
            {renderArrowCol(numUpstreams, false)}
          </Grid>

          <Grid item xs={3}>
            {renderResourceCard(current.get('stat'), 'main')}
          </Grid>

          <Grid item xs={1}>
            {renderArrowCol(numDownstreams, true)}
          </Grid>

          <Grid
            container
            spacing={3}
            direction="column"
            justify="center"
            alignItems="center"
            item
            xs={3}
          >
            {outbound.size > 0 || outbound.length > 0
              ? outbound.map((n) => renderResourceCard(n, 'neighbor'))
              : null}
          </Grid>
        </Grid>
      </div>
    </div>
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

export default compose(withConnect)(SvcMeshWorkloadsCharts);
