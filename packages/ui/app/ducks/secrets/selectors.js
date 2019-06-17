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
 * Direct selector to the secrets duck
 */

const selectSecretsDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectSecrets = () =>
  createSelector(
    selectSecretsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    (substate, clusterID, namespaceID) =>
      substate.getIn(['secrets', clusterID, namespaceID]) || substate.clear()
  );

export const makeSelectSecretsList = () =>
  createSelector(
    selectSecretsDomain,
    makeSelectSecrets(),
    (substate, secrets) =>
      substate.get('list').map((id) => secrets.get(id))
  );

export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentNamespace(),
    (ns) => ns.getIn(['links', 'secrets'])
  );

export const makeSelectSecretID = () =>
  createSelector(
    createMatchSelector('/clusters/:cluster_id/namespaces/:namespace_id/secrets/:secret_id'),
    (match) => {
      if (match && match.params) {
        return match.params.secret_id;
      }
      return '';
    }
  );

export const makeSelectCurrentSecret = () =>
  createSelector(
    makeSelectSecrets(),
    makeSelectSecretID(),
    (secrets, id) => secrets.get(id) || secrets.clear()
  );

/**
 * Default selector used by LoginPage
 */

const makeSelectSecretsDomain = () =>
  createSelector(
    selectSecretsDomain,
    (substate) => substate
  );

export default makeSelectSecretsDomain;
