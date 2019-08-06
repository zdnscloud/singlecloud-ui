import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import { makeSelectCurrentNamespace } from 'ducks/namespaces/selectors';

import { prefix } from './constants';

/**
 * Direct selector to the applications duck
 */

const selectApplicationsDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectApplications = () =>
  createSelector(
    selectApplicationsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    (substate, clusterID, namespaceID) =>
      substate.getIn(['applications', clusterID, namespaceID]) || substate.clear()
  );

export const makeSelectApplicationsList = () =>
  createSelector(
    selectApplicationsDomain,
    makeSelectApplications(),
    (substate, applications) =>
      substate.get('list').map((id) => applications.get(id))
  );

export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentNamespace(),
    (ns) => ns.getIn(['links', 'configmaps'])
  );

export const makeSelectApplicationID = () =>
  createSelector(
    createMatchSelector(
      '/clusters/:cluster_id/namespaces/:namespace_id/configmaps/:configmap_id'
    ),
    (match) => {
      if (match && match.params) {
        return match.params.configmap_id;
      }
      return '';
    }
  );

export const makeSelectCurrentApplication = () =>
  createSelector(
    makeSelectApplications(),
    makeSelectApplicationID(),
    (maps, id) => maps.get(id)
  );

/**
 * Default selector used by LoginPage
 */

const makeSelectApplicationsDomain = () =>
  createSelector(
    selectApplicationsDomain,
    (substate) => substate
  );

export default makeSelectApplicationsDomain;
