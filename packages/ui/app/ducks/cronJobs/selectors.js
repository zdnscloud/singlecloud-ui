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
 * Direct selector to the cronJobs duck
 */

const selectCronJobsDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectCronJobs = () =>
  createSelector(
    selectCronJobsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    (substate, clusterID, namespaceID) =>
      substate.getIn(['cronJobs', clusterID, namespaceID]) || substate.clear()
  );

export const makeSelectCronJobsList = () =>
  createSelector(
    selectCronJobsDomain,
    makeSelectCronJobs(),
    (substate, cronJobs) =>
      substate.get('list').map((id) => cronJobs.get(id))
  );

export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentNamespace(),
    (ns) => ns.getIn(['links', 'cronjobs'])
  );

export const makeSelectCronJobID = () =>
  createSelector(
    createMatchSelector('/clusters/:cluster_id/namespaces/:namespace_id/cronJobs/:cronJob_id'),
    (match) => {
      if (match && match.params) {
        return match.params.cronJob_id;
      }
      return '';
    }
  );

export const makeSelectCurrentCronJob = () =>
  createSelector(
    selectCronJobsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectCronJobID(),
    (substate, clusterID, namespaceID, cronJobID) =>
      substate.getIn(['cronJobs', clusterID, namespaceID, cronJobID]) || substate.clear()
  );

/**
 * Default selector used by LoginPage
 */

const makeSelectCronJobsDomain = () =>
  createSelector(
    selectCronJobsDomain,
    (substate) => substate
  );

export default makeSelectCronJobsDomain;
