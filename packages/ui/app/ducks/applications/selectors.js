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
      substate.getIn(['applications', clusterID, namespaceID]) ||
      substate.clear()
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
    (ns) => ns.getIn(['links', 'applications'])
  );

export const makeSelectApplicationID = () =>
  createSelector(
    createMatchSelector(
      '/clusters/:cluster_id/namespaces/:namespace_id/applications/:application_id'
    ),
    (match) => {
      if (match && match.params) {
        return match.params.application_id;
      }
      return '';
    }
  );

export const makeSelectCurrentApplication = () =>
  createSelector(
    selectApplicationsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectApplicationID(),
    (substate, clusterID, namespaceID, applicationID) =>
      substate.getIn(['applications', clusterID, namespaceID, applicationID]) ||
      substate.clear()
  );

export const makeSelectDeleteApplicationError = () =>
  createSelector(
    selectApplicationsDomain,
    (state) => state.get('deleteError')
  );

export const makeSelectCurrentChart = () =>
  createSelector(
    selectApplicationsDomain,
    (substate) => substate.get('chart') || substate.clear()
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
