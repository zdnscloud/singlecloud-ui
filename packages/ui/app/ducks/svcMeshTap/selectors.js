/**
 * Duck: SvcMeshTap
 * selectors: svcMeshTap
 *
 */
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import * as c from './constants';
import { initialState } from './index';

/**
 * Direct selector to the svcMeshTap domain
 */
export const selectDomain = (state) => state.get(c.prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(selectDomain, (substate) => '/apis/zcloud.cn/v1/svcmeshtap');

export const makeSelectData = () =>
  createSelector(selectDomain, (substate) => substate.get('data'));

export const makeSelectSvcMeshTaps = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    (substate, clusterID, namespaceID) =>
      substate.getIn(['data', clusterID, namespaceID]) || substate.clear()
  );

export const makeSelectSvcMeshTapsList = () =>
  createSelector(
    selectDomain,
    makeSelectSvcMeshTaps(),
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    (substate, data, clusterID, namespaceID) =>
      (
        substate.getIn(['list', clusterID, namespaceID]) || fromJS([])
      ).map((id) => data.get(id)) || fromJS([])
  );
