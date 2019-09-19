import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import {
  makeSelectCurrentID as makeSelectCurrentClusterID,
  selectDomain as selectClustersDomain,
} from 'ducks/clusters/selectors';
import { prefix } from './constants';

/**
 * Direct selector to the namespaces duck
 */
export const selectNamespacesDomain = (state) => state.get(prefix);
export const selectDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectNamespaces = () =>
  createSelector(
    selectNamespacesDomain,
    makeSelectCurrentClusterID(),
    (substate, clusterID) =>
      substate.getIn(['namespaces', clusterID]) || substate.clear()
  );

export const makeSelectNamespacesWithoutClusterID = () =>
  createSelector(
    selectNamespacesDomain,
    (substate) => substate.get('namespaces') || substate.clear()
  );

export const makeSelectNamespacesList = () =>
  createSelector(
    selectNamespacesDomain,
    makeSelectNamespaces(),
    (substate, namespaces) =>
      substate.get('list').map((id) => namespaces.get(id))
  );

export const makeSelectCurrentID = () =>
  createSelector(
    createMatchSelector('*/namespaces/:id/*'),
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
    (substate, clusterID, id) =>
      substate.getIn(['namespaces', clusterID, id]) || substate.clear()
  );

export const makeSelectCurrentNamespaceID = () =>
  createSelector(
    selectNamespacesDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentID(),
    makeSelectNamespacesList(),
    (substate, clusterID, nid, ns) =>
      substate.getIn(['selectedNamespace', clusterID]) ||
      nid ||
      ns.getIn([0, 'id']) ||
      ''
  );

export const makeSelectCurrentNamespace = () =>
  createSelector(
    selectNamespacesDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    (substate, clusterID, nid) =>
      substate.getIn(['namespaces', clusterID, nid]) || substate.clear()
  );

export const makeSelectClustersAndNamespaces = () =>
  createSelector(
    selectClustersDomain,
    selectNamespacesDomain,
    (cstate, nsstate) =>
      cstate
        .get('data')
        .map((c) =>
          c.set(
            'namespaces',
            nsstate.getIn(['namespaces', c.get('id')], c.clear())
          )
        )
  );

/**
 * Default selector used by Namespaces
 */
export default makeSelectNamespaces;
