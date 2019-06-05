/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineEpics } from 'redux-observable';

import eventsPageEpic from 'containers/EventsPage/epic';
import roleEpic from 'ducks/role/epic';
import usersEpic from 'ducks/users/epic';
import namespacesEpic from 'ducks/namespaces/epic';
import configMapsEpic from 'ducks/configMaps/epic';
import secretsEpic from 'ducks/secrets/epic';
import deploymentsEpic from 'ducks/deployments/epic';
import statefulSetsEpic from 'ducks/statefulSets/epic';
import daemonSetsEpic from 'ducks/daemonSets/epic';
import cronJobsEpic from 'ducks/cronJobs/epic';
import jobsEpic from 'ducks/jobs/epic';
import podsEpic from 'ducks/pods/epic';
import serviceLinksEpic from 'ducks/serviceLinks/epic';
import storagesEpic from 'ducks/storages/epic';
import networksEpic from 'ducks/networks/epic';

/**
 * Create root Epic
 */
export default function createEpic(injectedEpics = {}) {
  const rootEpic = combineEpics(
    eventsPageEpic,
    roleEpic,
    usersEpic,
    namespacesEpic,
    configMapsEpic,
    secretsEpic,
    deploymentsEpic,
    statefulSetsEpic,
    daemonSetsEpic,
    cronJobsEpic,
    jobsEpic,
    podsEpic,
    serviceLinksEpic,
    storagesEpic,
    networksEpic
  );

  return rootEpic;
}
