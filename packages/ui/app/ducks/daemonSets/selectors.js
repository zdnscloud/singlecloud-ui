import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'containers/App/selectors';
import { makeSelectCurrentNamespace } from 'ducks/namespaces/selectors';

import { prefix } from './constants';

/**
 * Direct selector to the daemonSets duck
 */

const selectDaemonSetsDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectDaemonSets = () =>
  createSelector(
    selectDaemonSetsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    (substate, clusterID, namespaceID) =>
      substate.getIn(['daemonSets', clusterID, namespaceID]) || substate.clear()
  );

export const makeSelectDaemonSetsList = () =>
  createSelector(
    selectDaemonSetsDomain,
    makeSelectDaemonSets(),
    (substate, daemonSets) =>
      substate.get('list').map((id) => daemonSets.get(id))
  );

export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentNamespace(),
    (ns) => ns.getIn(['links', 'daemonsets'])
  );

export const makeSelectDaemonSetID = () =>
  createSelector(
    createMatchSelector('/clusters/:cluster_id/namespaces/:namespace_id/daemonSets/:daemonSet_id'),
    (match) => {
      if (match && match.params) {
        return match.params.daemonSet_id;
      }
      return '';
    }
  );

export const makeSelectCurrentDaemonSet = () =>
  createSelector(
    selectDaemonSetsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectDaemonSetID(),
    (substate, clusterID, namespaceID, daemonSetID) =>
      substate.getIn(['daemonSets', clusterID, namespaceID, daemonSetID]) || substate.clear()
  );

/**
 * Default selector used by LoginPage
 */

const makeSelectDaemonSetsDomain = () =>
  createSelector(
    selectDaemonSetsDomain,
    (substate) => substate
  );

export default makeSelectDaemonSetsDomain;
