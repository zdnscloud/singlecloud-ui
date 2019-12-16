/**
 * Duck: SvcMeshWorkloads
 * selectors: svcMeshWorkloads
 *
 */
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import {
  makeSelectCurrent as makeSelectCurrentSvcMeshWorkloadGroup,
} from 'ducks/svcMeshWorkloadGroups/selectors';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectCurrentID as makeSelectCurrentSvcMeshWorkloadGroupID } from 'ducks/svcMeshWorkloadGroups/selectors';
import * as c from './constants';
import { initialState } from './index';

/**
 * Direct selector to the svcMeshWorkloads domain
 */
export const selectDomain = (state) => state.get(c.prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentSvcMeshWorkloadGroup(),
    (pt) => pt.getIn(['links', 'svcmeshworkloads'])
  );

export const makeSelectData = () =>
  createSelector(
    selectDomain,
    (substate) => substate.get('data')
  );

export const makeSelectSvcMeshWorkloads = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    makeSelectCurrentSvcMeshWorkloadGroupID(),
  (
    substate,
      clusterID,
      namespaceID,
      svcMeshWorkloadGroupID,
  ) =>
    substate.getIn([
      'data',
      clusterID,
      namespaceID,
      svcMeshWorkloadGroupID,
      ]) || substate.clear()
  );

export const makeSelectSvcMeshWorkloadsList = () =>
  createSelector(
    selectDomain,
    makeSelectSvcMeshWorkloads(),
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    makeSelectCurrentSvcMeshWorkloadGroupID(),
  (
    substate,
    data,
      clusterID,
      namespaceID,
      svcMeshWorkloadGroupID,
  ) =>
    (substate.getIn([
      'list',
      clusterID,
      namespaceID,
      svcMeshWorkloadGroupID,
    ]) || fromJS([])).map((id) => data.get(id)) || fromJS([])
  );

export const makeSelectCurrentID = () =>
   createSelector(
     createMatchSelector('*/svcMeshWorkloads/:id/*'),
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
    makeSelectCurrentSvcMeshWorkloadGroupID(),
    makeSelectCurrentID(),
    (
      substate,
      clusterID,
      namespaceID,
      svcMeshWorkloadGroupID,
      id
    ) =>
      substate.getIn([
        'data',
        clusterID,
        namespaceID,
        svcMeshWorkloadGroupID,
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
      .filter(({ type }) => type === c.LOAD_SVC_MESH_WORKLOADS_FAILURE)
  );



export const makeSelectReadErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
      .filter(({ type }) => type === c.READ_SVC_MESH_WORKLOAD_FAILURE)
  );


