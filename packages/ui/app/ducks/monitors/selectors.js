/**
 * Duck: Monitors
 * selectors: monitors
 *
 */
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';

import {
  makeSelectCurrent as makeSelectCurrentCluster,
  makeSelectCurrentID as makeSelectCurrentClusterID,
} from 'ducks/clusters/selectors';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';

import { prefix } from './constants';
import { initialState } from './index';

/**
 * Direct selector to the monitors domain
 */
export const selectDomain = (state) => state.get(prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentCluster(),
    (pt) => pt.getIn(['links', 'monitors'])
  );

export const makeSelectMonitors = () =>
  createSelector(
    selectDomain,
    makeSelectClusterID(),

    (substate, clusterID) =>
      substate.getIn(['data', clusterID]) || substate.clear()
  );

export const makeSelectMonitorsList = () =>
  createSelector(
    selectDomain,
    makeSelectMonitors(),
    makeSelectClusterID(),

    (substate, data, clusterID) =>
      (substate.getIn(['list', clusterID]) || fromJS([])).map((id) =>
        data.get(id)
      ) || fromJS([])
  );

export const makeSelectCurrentID = () =>
  createSelector(
    createMatchSelector('*/monitors/:id/*'),
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

    makeSelectCurrentID(),
    (substate, clusterID, id) =>
      substate.getIn(['data', clusterID, id]) || substate.clear()
  );

export const makeSelectError = () =>
  createSelector(
    selectDomain,
    (state) => state.get('error')
  );
