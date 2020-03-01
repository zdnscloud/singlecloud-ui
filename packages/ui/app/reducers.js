/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

// import reducers start
import appReducer from 'ducks/app';
import roleReducer, { prefix as rolePrefix } from 'ducks/role';
import usersReducer, { prefix as usersPrefix } from 'ducks/users';
import secretsReducer, { prefix as secretsPrefix } from 'ducks/secrets';
import cronJobsReducer, { prefix as cronJobsPrefix } from 'ducks/cronJobs';
import jobsReducer, { prefix as jobsPrefix } from 'ducks/jobs';
import podsReducer, { prefix as podsPrefix } from 'ducks/pods';
import podNetworksReducer, {
  prefix as podNetworksPrefix,
} from 'ducks/podNetworks';
import serviceNetworksReducer, {
  prefix as serviceNetworksPrefix,
} from 'ducks/serviceNetworks';
import nodeNetworksReducer, {
  prefix as nodeNetworksPrefix,
} from 'ducks/nodeNetworks';
import namespacesReducer, {
  prefix as namespacesPrefix,
} from 'ducks/namespaces';
import resourceQuotasReducer, {
  prefix as resourceQuotasPrefix,
} from 'ducks/resourceQuotas';
import nodesReducer, { prefix as nodesPrefix } from 'ducks/nodes';
import clustersReducer, { prefix as clustersPrefix } from 'ducks/clusters';
import eventsReducer, { prefix as eventsPrefix } from 'ducks/events';
import userQuotasReducer, {
  prefix as userQuotasPrefix,
} from 'ducks/userQuotas';
import servicesReducer, { prefix as servicesPrefix } from 'ducks/services';
import deploymentsReducer, {
  prefix as deploymentsPrefix,
} from 'ducks/deployments';
import horizontalPodAutoscalersReducer, {
  prefix as horizontalPodAutoscalersPrefix,
} from 'ducks/horizontalPodAutoscalers';
import metricsReducer, { prefix as metricsPrefix } from 'ducks/metrics';
import statefulSetsReducer, {
  prefix as statefulSetsPrefix,
} from 'ducks/statefulSets';
import daemonSetsReducer, {
  prefix as daemonSetsPrefix,
} from 'ducks/daemonSets';
import ingressesReducer, { prefix as ingressesPrefix } from 'ducks/ingresses';
import udpIngressesReducer, {
  prefix as udpIngressesPrefix,
} from 'ducks/udpIngresses';
import applicationsReducer, {
  prefix as applicationsPrefix,
} from 'ducks/applications';
import registriesReducer, {
  prefix as registriesPrefix,
} from 'ducks/registries';
import monitorsReducer, { prefix as monitorsPrefix } from 'ducks/monitors';
import efksReducer, { prefix as efksPrefix } from 'ducks/efks';
import chartsReducer, { prefix as chartsPrefix } from 'ducks/charts';
import configMapsReducer, {
  prefix as configMapsPrefix,
} from 'ducks/configMaps';
import storageClustersReducer, {
  prefix as storageClustersPrefix,
} from 'ducks/storageClusters';
import storageClassesReducer, {
  prefix as storageClassesPrefix,
} from 'ducks/storageClasses';
import blockDevicesReducer, {
  prefix as blockDevicesPrefix,
} from 'ducks/blockDevices';
import innerServicesReducer, {
  prefix as innerServicesPrefix,
} from 'ducks/innerServices';
import outerServicesReducer, {
  prefix as outerServicesPrefix,
} from 'ducks/outerServices';
import fluentbitconfigsReducer, {
  prefix as fluentbitconfigsPrefix,
} from 'ducks/fluentbitconfigs';
import svcMeshWorkloadsReducer, {
  prefix as svcMeshWorkloadsPrefix,
} from 'ducks/svcMeshWorkloads';
import svcMeshPodsReducer, {
  prefix as svcMeshPodsPrefix,
} from 'ducks/svcMeshPods';
import svcMeshTapReducer, {
  prefix as svcMeshTapPrefix,
} from 'ducks/svcMeshTap';
import alarmsReducer, { prefix as alarmsPrefix } from 'ducks/alarms';
import thresholdsReducer, {
  prefix as thresholdsPrefix,
} from 'ducks/thresholds';
import persistentVolumeClaimsReducer, {
  prefix as persistentVolumeClaimsPrefix,
} from 'ducks/persistentVolumeClaims';
import persistentVolumesReducer, {
  prefix as persistentVolumesPrefix,
} from 'ducks/persistentVolumes';
import auditLogsReducer, {
  prefix as auditLogsPrefix,
} from 'ducks/auditLogs';
import workFlowTasksReducer, {
  prefix as workFlowTasksPrefix,
} from 'ducks/workFlowTasks';
import workFlowsReducer, {
  prefix as workFlowsPrefix,
} from 'ducks/workFlows';

// import reducers end

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    // combine reducers start
    language: languageProviderReducer,
    router: connectRouter(history),
    form: formReducer,
    app: appReducer,
    [rolePrefix]: roleReducer,
    [usersPrefix]: usersReducer,
    [configMapsPrefix]: configMapsReducer,
    [secretsPrefix]: secretsReducer,
    [horizontalPodAutoscalersPrefix]: horizontalPodAutoscalersReducer,
    [metricsPrefix]: metricsReducer,
    [deploymentsPrefix]: deploymentsReducer,
    [statefulSetsPrefix]: statefulSetsReducer,
    [daemonSetsPrefix]: daemonSetsReducer,
    [cronJobsPrefix]: cronJobsReducer,
    [jobsPrefix]: jobsReducer,
    [podsPrefix]: podsReducer,
    [podNetworksPrefix]: podNetworksReducer,
    [serviceNetworksPrefix]: serviceNetworksReducer,
    [nodeNetworksPrefix]: nodeNetworksReducer,
    [namespacesPrefix]: namespacesReducer,
    [resourceQuotasPrefix]: resourceQuotasReducer,
    [nodesPrefix]: nodesReducer,
    [clustersPrefix]: clustersReducer,
    [eventsPrefix]: eventsReducer,
    [userQuotasPrefix]: userQuotasReducer,
    [servicesPrefix]: servicesReducer,
    [ingressesPrefix]: ingressesReducer,
    [udpIngressesPrefix]: udpIngressesReducer,
    [applicationsPrefix]: applicationsReducer,
    [registriesPrefix]: registriesReducer,
    [monitorsPrefix]: monitorsReducer,
    [efksPrefix]: efksReducer,
    [chartsPrefix]: chartsReducer,
    [storageClustersPrefix]: storageClustersReducer,
    [storageClassesPrefix]: storageClassesReducer,
    [blockDevicesPrefix]: blockDevicesReducer,
    [innerServicesPrefix]: innerServicesReducer,
    [outerServicesPrefix]: outerServicesReducer,
    [fluentbitconfigsPrefix]: fluentbitconfigsReducer,
    [svcMeshWorkloadsPrefix]: svcMeshWorkloadsReducer,
    [svcMeshPodsPrefix]: svcMeshPodsReducer,
    [svcMeshTapPrefix]: svcMeshTapReducer,
    [alarmsPrefix]: alarmsReducer,
    [thresholdsPrefix]: thresholdsReducer,
    [persistentVolumeClaimsPrefix]: persistentVolumeClaimsReducer,
    [persistentVolumesPrefix]: persistentVolumesReducer,
    [auditLogsPrefix]: auditLogsReducer,
    [workFlowTasksPrefix]: workFlowTasksReducer,
    [workFlowsPrefix]: workFlowsReducer,
    // combine reducers end
    ...injectedReducers,
  });

  return rootReducer;
}
