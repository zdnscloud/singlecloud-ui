import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import { makeSelectClusterID, makeSelectNamespaceID } from 'containers/App/selectors';
import { prefix } from './constants';

/**
 * Direct selector to the namespaces duck
 */
export const selectNamespacesDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectNamespaces = () =>
  createSelector(
    selectNamespacesDomain,
    makeSelectClusterID(),
    (substate, clusterID) => substate.getIn(['namespaces', clusterID]) || substate.clear()
  );

export const makeSelectNamespacesList = () =>
  createSelector(
    selectNamespacesDomain,
    makeSelectNamespaces(),
    (substate, namespaces) =>
      substate.get('list').map((id) => namespaces.get(id))
  );

export const makeSelectCurrentNamespaceID = () =>
  createSelector(
    selectNamespacesDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectNamespacesList(),
    (substate, clusterID, nid, ns) =>
      substate.getIn(['selectedNamespace', clusterID]) || nid || ns.getIn([0, 'id'])
  );

export const makeSelectCurrentNamespace = () =>
  createSelector(
    selectNamespacesDomain,
    makeSelectClusterID(),
    makeSelectCurrentNamespaceID(),
    (substate, clusterID, nid) =>
      substate.getIn(['namespaces', clusterID, nid]) || substate.clear()
  );


/**
 * Default selector used by Namespaces
 */
export default makeSelectNamespaces;
