import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { prefix } from './constants';

/**
 * Direct selector to the podNetworks duck
 */

const selectNetworksDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectPodNetworks = () =>
  createSelector(
    selectNetworksDomain,
    (substate) => substate.get('podNetworks')
  );

export const makeSelectServiceNetworks = () =>
  createSelector(
    selectNetworksDomain,
    (substate) => substate.get('serviceNetworks')
  );

export const makeSelectCurrentPodNetworks = () =>
  createSelector(
    makeSelectPodNetworks(),
    makeSelectClusterID(),
    (networks, clusterID) => networks.getIn([clusterID]) || networks.clear()
  );

export const makeSelectCurrentServiceNetworks = () =>
  createSelector(
    makeSelectServiceNetworks(),
    makeSelectClusterID(),
    (networks, clusterID) => networks.getIn([clusterID]) || networks.clear()
  );

/**
 * Default selector used by LoginPage
 */

const makeSelectNetworks = () =>
  createSelector(
    selectNetworksDomain,
    (substate) => substate
  );

export default makeSelectNetworks;
