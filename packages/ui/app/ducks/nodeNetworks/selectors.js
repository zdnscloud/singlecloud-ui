/**
 * Duck: NodeNetworks
 * selectors: nodeNetworks
 *
 */
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import { makeSelectCurrent as makeSelectCurrentCluster } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { prefix } from './constants';
import { initialState } from './index';

/**
 * Direct selector to the nodeNetworks domain
 */
export const selectDomain = (state) => state.get(prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentCluster(),
    (pt) => pt.getIn(['links', 'nodenetworks'])
  );

export const makeSelectData = () =>
  createSelector(
    selectDomain,
    (substate) => substate.get('data')
  );

export const makeSelectNodeNetworks = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    (substate, clusterID) =>
      substate.getIn(['data', clusterID]) || substate.clear()
  );

export const makeSelectNodeNetworksList = () =>
  createSelector(
    selectDomain,
    makeSelectNodeNetworks(),
    makeSelectCurrentClusterID(),
    (substate, data, clusterID) =>
      (substate.getIn(['list', clusterID]) || fromJS([])).map((id) =>
        data.get(id)
      ) || fromJS([])
  );

export const makeSelectCurrentID = () =>
  createSelector(
    createMatchSelector('*/nodeNetworks/:id/*'),
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
