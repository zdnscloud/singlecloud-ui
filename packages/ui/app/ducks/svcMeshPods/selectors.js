/**
 * Duck: SvcMeshPods
 * selectors: svcMeshPods
 *
 */
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import {
  makeSelectCurrent as makeSelectCurrentSvcMeshWorkload,
  makeSelectCurrentID as makeSelectCurrentSvcMeshWorkloadID,
} from 'ducks/svcMeshWorkloads/selectors';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';

import * as c from './constants';
import { initialState } from './index';

/**
 * Direct selector to the svcMeshPods domain
 */
export const selectDomain = (state) => state.get(c.prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(makeSelectCurrentSvcMeshWorkload(), (pt) =>
    pt.getIn(['links', 'svcmeshpods'])
  );

export const makeSelectData = () =>
  createSelector(selectDomain, (substate) => substate.get('data'));

export const makeSelectSvcMeshPods = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    makeSelectCurrentSvcMeshWorkloadID(),
    (substate, clusterID, namespaceID, svcMeshWorkloadID) =>
      substate.getIn(['data', clusterID, namespaceID, svcMeshWorkloadID]) ||
      substate.clear()
  );

export const makeSelectSvcMeshPodsList = () =>
  createSelector(
    selectDomain,
    makeSelectSvcMeshPods(),
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    makeSelectCurrentSvcMeshWorkloadID(),
    (substate, data, clusterID, namespaceID, svcMeshWorkloadID) =>
      (
        substate.getIn(['list', clusterID, namespaceID, svcMeshWorkloadID]) ||
        fromJS([])
      ).map((id) => data.get(id)) || fromJS([])
  );

export const makeSelectCurrentID = () =>
  createSelector(createMatchSelector('*/svcMeshPods/:id/*'), (match) => {
    if (match && match.params) {
      return match.params.id;
    }
    return '';
  });

export const makeSelectCurrent = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    makeSelectCurrentSvcMeshWorkloadID(),
    makeSelectCurrentID(),
    (substate, clusterID, namespaceID, svcMeshWorkloadID, id) =>
      substate.getIn(['data', clusterID, namespaceID, svcMeshWorkloadID, id]) ||
      substate.clear()
  );

export const makeSelectErrorsList = () =>
  createSelector(selectDomain, (substate) => substate.get('errorsList'));

export const makeSelectLoadErrorsList = () =>
  createSelector(selectDomain, (substate) =>
    substate
      .get('errorsList')
      .filter(({ type }) => type === c.LOAD_SVC_MESH_PODS_FAILURE)
  );

export const makeSelectReadErrorsList = () =>
  createSelector(selectDomain, (substate) =>
    substate
      .get('errorsList')
      .filter(({ type }) => type === c.READ_SVC_MESH_POD_FAILURE)
  );
