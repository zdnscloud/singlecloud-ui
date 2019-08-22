/**
 * Duck: Daemonsets
 * selectors: daemonSets
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

import { prefix } from './constants';
import { initialState } from './index';

/**
 * Direct selector to the daemonSets domain
 */
export const selectDomain = (state) => state.get(prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentNamespace(),
    (pt) => pt.getIn(['links', 'daemonsets'])
  );

export const makeSelectDaemonSets = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),

    (substate, clusterID, namespaceID) =>
      substate.getIn(['data', clusterID, namespaceID])
        || substate.clear()
  );

export const makeSelectDaemonSetsList = () =>
  createSelector(
    selectDomain,
    makeSelectDaemonSets(),
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),

    (substate, data, clusterID, namespaceID) =>
      (substate.getIn(['list', clusterID, namespaceID]) || fromJS([]))
        .map((id) => data.get(id)) || fromJS([])
  );

export const makeSelectCurrentID = () =>
   createSelector(
     createMatchSelector('*/daemonSets/:id/*'),
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
    (substate, clusterID, namespaceID, id) =>
      substate.getIn(['data', clusterID, namespaceID, id]) || substate.clear()
  );
