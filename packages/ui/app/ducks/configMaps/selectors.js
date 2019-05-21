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
    (ns) => ns.getIn(['links', 'configmaps'])
  );

export const makeSelectConfigMapID = () =>
  createSelector(
    createMatchSelector('/clusters/:cluster_id/namespaces/:namespace_id/configmaps/:configmap_id'),
    (match) => {
      if (match && match.params) {
        return match.params.configmap_id;
      }
      return '';
    }
  );

export const makeSelectCurrentConfigMap = () =>
  createSelector(
    makeSelectConfigMaps(),
    makeSelectConfigMapID(),
    (maps, id) => maps.get(id)
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
