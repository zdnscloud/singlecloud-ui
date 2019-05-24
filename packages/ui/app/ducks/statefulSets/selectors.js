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
 * Direct selector to the statefulSets duck
 */

const selectStatefulSetsDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectStatefulSets = () =>
  createSelector(
    selectStatefulSetsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    (substate, clusterID, namespaceID) =>
      substate.getIn(['statefulSets', clusterID, namespaceID]) || substate.clear()
  );

export const makeSelectStatefulSetsList = () =>
  createSelector(
    selectStatefulSetsDomain,
    makeSelectStatefulSets(),
    (substate, statefulSets) =>
      substate.get('list').map((id) => statefulSets.get(id))
  );

export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentNamespace(),
    (ns) => ns.getIn(['links', 'statefulsets'])
  );

export const makeSelectStatefulSetID = () =>
  createSelector(
    createMatchSelector('/clusters/:cluster_id/namespaces/:namespace_id/statefulSets/:statefulSet_id'),
    (match) => {
      if (match && match.params) {
        return match.params.statefulSet_id;
      }
      return '';
    }
  );

export const makeSelectCurrentStatefulSet = () =>
  createSelector(
    selectStatefulSetsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectStatefulSetID(),
    (substate, clusterID, namespaceID, statefulSetID) =>
      substate.getIn(['statefulSets', clusterID, namespaceID, statefulSetID]) || substate.clear()
  );

/**
 * Default selector used by LoginPage
 */

const makeSelectStatefulSetsDomain = () =>
  createSelector(
    selectStatefulSetsDomain,
    (substate) => substate
  );

export default makeSelectStatefulSetsDomain;
