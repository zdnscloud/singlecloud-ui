/**
 * Duck: Networks
 * selectors: networks
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

import { prefix } from './constants';
import { initialState } from './index';

/**
 * Direct selector to the podNetworks duck
 */

export const selectDomain = (state) => state.get(prefix) || initialState;

/**
 * Other specific selectors
 */

export const makeSelectPodURL = () =>
  createSelector(
    makeSelectCurrentCluster(),
    (pt) => pt.getIn(['links', 'podnetworks'])
  );

export const makeSelectServiceURL = () =>
  createSelector(
    makeSelectCurrentCluster(),
    (pt) => pt.getIn(['links', 'servicenetworks'])
  );

export const makeSelectNodeURL = () =>
  createSelector(
    makeSelectCurrentCluster(),
    (pt) => pt.getIn(['links', 'nodenetworks'])
  );

export const makeSelectPodNetworks = () =>
  createSelector(
    selectDomain,
    (substate) => substate.get('podNetworks')
  );

export const makeSelectServiceNetworks = () =>
  createSelector(
    selectDomain,
    (substate) => substate.get('serviceNetworks')
  );

export const makeSelectNodeNetworks = () =>
  createSelector(
    selectDomain,
    (substate) => substate.get('nodeNetworks')
  );

export const makeSelectCurrentPodNetworks = () =>
  createSelector(
    makeSelectPodNetworks(),
    makeSelectCurrentClusterID(),
    (substate, clusterID) => substate.getIn([clusterID]) || fromJS([])
  );

export const makeSelectCurrentServiceNetworks = () =>
  createSelector(
    makeSelectServiceNetworks(),
    makeSelectCurrentClusterID(),
    (substate, clusterID) => substate.getIn([clusterID]) || fromJS([])
  );

export const makeSelectCurrentNodeNetworks = () =>
  createSelector(
    makeSelectNodeNetworks(),
    makeSelectCurrentClusterID(),
    (substate, clusterID) => substate.getIn([clusterID]) || fromJS([])
  );
