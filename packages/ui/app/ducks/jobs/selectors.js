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
 * Direct selector to the jobs duck
 */

const selectJobsDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectJobs = () =>
  createSelector(
    selectJobsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    (substate, clusterID, namespaceID) =>
      substate.getIn(['jobs', clusterID, namespaceID]) || substate.clear()
  );

export const makeSelectJobsList = () =>
  createSelector(
    selectJobsDomain,
    makeSelectJobs(),
    (substate, jobs) => substate.get('list').map((id) => jobs.get(id))
  );

export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentNamespace(),
    (ns) => ns.getIn(['links', 'jobs'])
  );

export const makeSelectJobID = () =>
  createSelector(
    createMatchSelector(
      '/clusters/:cluster_id/namespaces/:namespace_id/jobs/:job_id'
    ),
    (match) => {
      if (match && match.params) {
        return match.params.job_id;
      }
      return '';
    }
  );

export const makeSelectCurrentJob = () =>
  createSelector(
    selectJobsDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    makeSelectJobID(),
    (substate, clusterID, namespaceID, jobID) =>
      substate.getIn(['jobs', clusterID, namespaceID, jobID]) ||
      substate.clear()
  );

/**
 * Default selector used by LoginPage
 */

const makeSelectJobsDomain = () =>
  createSelector(
    selectJobsDomain,
    (substate) => substate
  );

export default makeSelectJobsDomain;
