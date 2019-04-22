import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'containers/App/selectors';
import { makeSelectCurrentNamespace } from 'containers/NamespacesPage/selectors';

import { prefix } from './constants';

/**
 * Direct selector to the configMaps duck
 */

const selectConfigMapsDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectConfigMaps = () =>
  createSelector(
    selectConfigMapsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    (substate, clusterID, namespaceID) =>
      substate.getIn(['configMaps', clusterID, namespaceID]) || substate.clear()
  );

export const makeSelectConfigMapsList = () =>
  createSelector(
    selectConfigMapsDomain,
    makeSelectConfigMaps(),
    (substate, configMaps) =>
      substate.get('list').map((id) => configMaps.get(id))
  );

export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentNamespace(),
    (ns) => ns.getIn(['links', 'configmaps']).replace(/^https?:\/\/([^/]+)/, '')
  );

/**
 * Default selector used by LoginPage
 */

const makeSelectConfigMapsDomain = () =>
  createSelector(
    selectConfigMapsDomain,
    (substate) => substate
  );

export default makeSelectConfigMapsDomain;
