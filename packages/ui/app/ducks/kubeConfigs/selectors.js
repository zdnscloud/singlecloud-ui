/**
 * Duck: KubeConfigs
 * selectors: kubeConfigs
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
} from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import * as c from './constants';
import { initialState } from './index';

/**
 * Direct selector to the kubeConfigs domain
 */
export const selectDomain = (state) => state.get(c.prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentCluster(),
    (pt) => pt.getIn(['links', 'kubeconfigs'])
  );

export const makeSelectData = () =>
  createSelector(
    selectDomain,
    (substate) => substate.get('data')
  );

export const makeSelectKubeConfigs = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
  (
    substate,
      clusterID,
  ) =>
    substate.getIn([
      'data',
      clusterID,
      ]) || substate.clear()
  );

export const makeSelectKubeConfigsList = () =>
  createSelector(
    selectDomain,
    makeSelectKubeConfigs(),
    makeSelectCurrentClusterID(),
  (
    substate,
    data,
      clusterID,
  ) =>
    (substate.getIn([
      'list',
      clusterID,
    ]) || fromJS([])).map((id) => data.get(id)) || fromJS([])
  );

export const makeSelectCurrentID = () =>
   createSelector(
     createMatchSelector('*/kubeConfigs/:id/*'),
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
    (
      substate,
      clusterID,
      id
    ) =>
      substate.getIn([
        'data',
        clusterID,
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
      .filter(({ type }) => type === c.LOAD_KUBE_CONFIGS_FAILURE)
  );



export const makeSelectReadErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
      .filter(({ type }) => type === c.READ_KUBE_CONFIG_FAILURE)
  );


