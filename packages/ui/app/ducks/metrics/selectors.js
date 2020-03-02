/**
 * Duck: Metrics
 * selectors: metrics
 *
 */
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import {
  makeSelectCurrent as makeSelectCurrentDeployment,
  makeSelectCurrentID as makeSelectCurrentDeploymentID } from 'ducks/deployments/selectors';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';

import * as c from './constants';
import { initialState } from './index';

/**
 * Direct selector to the metrics domain
 */
export const selectDomain = (state) => state.get(c.prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentDeployment(),
    (pt) => pt.getIn(['links', 'metrics'])
  );

export const makeSelectData = () =>
  createSelector(
    selectDomain,
    (substate) => substate.get('data')
  );

export const makeSelectMetrics = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    makeSelectCurrentDeploymentID(),
    (
      substate,
      clusterID,
      namespaceID,
      deploymentID,
    ) =>
      substate.getIn([
        'data',
        clusterID,
        namespaceID,
        deploymentID,
      ]) || substate.clear()
  );

export const makeSelectMetricsList = () =>
  createSelector(
    selectDomain,
    makeSelectMetrics(),
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    makeSelectCurrentDeploymentID(),
    (
      substate,
      data,
      clusterID,
      namespaceID,
      deploymentID,
    ) =>
      (substate.getIn([
        'list',
        clusterID,
        namespaceID,
        deploymentID,
      ]) || fromJS([])).map((id) => data.get(id)) || fromJS([])
  );

export const makeSelectCurrentID = () =>
  createSelector(
    createMatchSelector('*/metrics/:id/*'),
    (match) => {
      if (match && match.params) {
        return match.params.id;
      }
      return '';
    }
  );

export const makeSelectCurrent = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    makeSelectCurrentDeploymentID(),
    makeSelectCurrentID(),
    (
      substate,
      clusterID,
      namespaceID,
      deploymentID,
      id
    ) =>
      substate.getIn([
        'data',
        clusterID,
        namespaceID,
        deploymentID,
        id,
      ]) || substate.clear()
  );

export const makeSelectErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) => substate.get('errorsList')
  );

export const makeSelectLoadErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
        .filter(({ type }) => type === c.LOAD_METRICS_FAILURE)
  );





