/**
 * Duck: Udpingresses
 * selectors: udpingresses
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
 * Direct selector to the udpingresses domain
 */
export const selectDomain = (state) => state.get(prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentNamespace(),
    (pt) => pt.getIn(['links', 'udpingresses'])
  );

export const makeSelectServicesURL = () =>
  createSelector(
    makeSelectCurrentNamespace(),
    (pt) => pt.getIn(['links', 'services'])
  );

export const makeSelectUdpingresses = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),

    (substate, clusterID, namespaceID) =>
      substate.getIn(['data', clusterID, namespaceID])
        || substate.clear()
  );

export const makeSelectUdpingressesList = () =>
  createSelector(
    selectDomain,
    makeSelectUdpingresses(),
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),

    (substate, data, clusterID, namespaceID) =>
      (substate.getIn(['list', clusterID, namespaceID]) || fromJS([]))
        .map((id) => data.get(id)) || fromJS([])
  );

export const makeSelectCurrentID = () =>
   createSelector(
     createMatchSelector('/clusters/:cluster_id/namespaces/:namespace_id/udpingresses/:udpingress_id/*'),
     (match) => {
       if (match && match.params) {
         return match.params.udpingress_id;
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
