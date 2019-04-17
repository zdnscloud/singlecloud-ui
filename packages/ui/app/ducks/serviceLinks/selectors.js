import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'containers/App/selectors';
import { prefix } from './constants';

/**
 * Direct selector to the outerServices duck
 */

const selectServiceLinsDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectOuterServices = () =>
  createSelector(
    selectServiceLinsDomain,
    (substate) => substate.get('outerServices')
  );

export const makeSelectInnerServices = () =>
  createSelector(
    selectServiceLinsDomain,
    (substate) => substate.get('innerServices')
  );

export const makeSelectCurrentOuterServices = () =>
  createSelector(
    makeSelectOuterServices(),
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    (services, clusterID, namespaceID) =>
      services.getIn([clusterID, namespaceID]) || services.clear().toList()
  );

export const makeSelectCurrentInnerServices = () =>
  createSelector(
    makeSelectInnerServices(),
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    (services, clusterID, namespaceID) =>
      services.getIn([clusterID, namespaceID]) || services.clear().toList()
  );

/**
 * Default selector used by LoginPage
 */

const makeSelectServiceLinks = () =>
  createSelector(
    selectServiceLinsDomain,
    (substate) => substate
  );

export default makeSelectServiceLinks;
