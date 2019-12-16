/**
 * Duck: HorizontalPodAutoscalers
 * selectors: horizontalPodAutoscalers
 *
 */
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import {
  makeSelectCurrent as makeSelectCurrentNamespace,
} from 'ducks/namespaces/selectors';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import * as c from './constants';
import { initialState } from './index';

/**
 * Direct selector to the horizontalPodAutoscalers domain
 */
export const selectDomain = (state) => state.get(c.prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentNamespace(),
    (pt) => pt.getIn(['links', 'horizontalpodautoscalers'])
  );

export const makeSelectData = () =>
  createSelector(
    selectDomain,
    (substate) => substate.get('data')
  );

export const makeSelectHorizontalPodAutoscalers = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
  (
    substate,
      clusterID,
      namespaceID,
  ) =>
    substate.getIn([
      'data',
      clusterID,
      namespaceID,
      ]) || substate.clear()
  );

export const makeSelectHorizontalPodAutoscalersList = () =>
  createSelector(
    selectDomain,
    makeSelectHorizontalPodAutoscalers(),
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
  (
    substate,
    data,
      clusterID,
      namespaceID,
  ) =>
    (substate.getIn([
      'list',
      clusterID,
      namespaceID,
    ]) || fromJS([])).map((id) => data.get(id)) || fromJS([])
  );

export const makeSelectCurrentID = () =>
   createSelector(
     createMatchSelector('*/horizontalPodAutoscalers/:id/*'),
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
    makeSelectCurrentID(),
    (
      substate,
      clusterID,
      namespaceID,
      id
    ) =>
      substate.getIn([
        'data',
        clusterID,
        namespaceID,
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
      .filter(({ type }) => type === c.LOAD_HORIZONTAL_POD_AUTOSCALERS_FAILURE)
  );

export const makeSelectCreateErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
      .filter(({ type }) => type === c.CREATE_HORIZONTAL_POD_AUTOSCALER_FAILURE)
  );

export const makeSelectUpdateErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
      .filter(({ type }) => type === c.UPDATE_HORIZONTAL_POD_AUTOSCALER_FAILURE)
  );

export const makeSelectReadErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
      .filter(({ type }) => type === c.READ_HORIZONTAL_POD_AUTOSCALER_FAILURE)
  );

export const makeSelectRemoveErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
      .filter(({ type }) => type === c.REMOVE_HORIZONTAL_POD_AUTOSCALER_FAILURE)
  );

