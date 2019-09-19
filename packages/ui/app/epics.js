/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineEpics } from 'redux-observable';

// import epics start
// import appEpic from 'ducks/app/epic';
import eventsEpic from 'ducks/events/epic';
import roleEpic from 'ducks/role/epic';
import usersEpic from 'ducks/users/epic';
import namespacesEpic from 'ducks/namespaces/epic';
import nodesEpic from 'ducks/nodes/epic';
import configMapsEpic from 'ducks/configMaps/epic';
import secretsEpic from 'ducks/secrets/epic';
import deploymentsEpic from 'ducks/deployments/epic';
import statefulSetsEpic from 'ducks/statefulSets/epic';
import daemonSetsEpic from 'ducks/daemonSets/epic';
import cronJobsEpic from 'ducks/cronJobs/epic';
import jobsEpic from 'ducks/jobs/epic';
import podsEpic from 'ducks/pods/epic';
import serviceLinksEpic from 'ducks/serviceLinks/epic';
import networksEpic from 'ducks/networks/epic';
import clustersEpic from 'ducks/clusters/epic';
import resourceQuotasEpic from 'ducks/resourceQuotas/epic';
import userQuotasEpic from 'ducks/userQuotas/epic';
import servicesEpic from 'ducks/services/epic';
import ingressesEpic from 'ducks/ingresses/epic';
import udpingressesEpic from 'ducks/udpingresses/epic';
import applicationsEpic from 'ducks/applications/epic';
import registriesEpic from 'ducks/registries/epic';
import monitorsEpic from 'ducks/monitors/epic';
import chartsEpic from 'ducks/charts/epic';
import storageClustersEpic from 'ducks/storageClusters/epic';
import storageClassesEpic from 'ducks/storageClasses/epic';
import blockDevicesEpic from 'ducks/blockDevices/epic';
// import epics end

/**
 * Create root Epic
 */
export default function createEpic(injectedEpics = {}) {
  const rootEpic = combineEpics(
    // combine epics start
    // appEpic,
    clustersEpic,
    eventsEpic,
    roleEpic,
    usersEpic,
    userQuotasEpic,
    namespacesEpic,
    nodesEpic,
    configMapsEpic,
    secretsEpic,
    deploymentsEpic,
    statefulSetsEpic,
    daemonSetsEpic,
    cronJobsEpic,
    jobsEpic,
    podsEpic,
    serviceLinksEpic,
    networksEpic,
    resourceQuotasEpic,
    servicesEpic,
    ingressesEpic,
    udpingressesEpic,
    applicationsEpic,
    registriesEpic,
    monitorsEpic,
    chartsEpic,
    storageClustersEpic,
    storageClassesEpic,
    blockDevicesEpic
    // combine epics end
  );

  return rootEpic;
}
