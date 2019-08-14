/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import terminalPageReducer from 'containers/TerminalPage/reducer';

// import reducers start
import appReducer from 'ducks/app';
import roleReducer, { prefix as rolePrefix } from 'ducks/role';
import usersReducer, { prefix as usersPrefix } from 'ducks/users';
import serviceLinksReducer, {
  prefix as serviceLinksPrefix,
} from 'ducks/serviceLinks';
import configMapsReducer, {
  prefix as configMapsPrefix,
} from 'ducks/configMaps';
import secretsReducer, { prefix as secretsPrefix } from 'ducks/secrets';
import deploymentsReducer, {
  prefix as deploymentsPrefix,
} from 'ducks/deployments';
import statefulSetsReducer, {
  prefix as statefulSetsPrefix,
} from 'ducks/statefulSets';
import daemonSetsReducer, {
  prefix as daemonSetsPrefix,
} from 'ducks/daemonSets';
import cronJobsReducer, { prefix as cronJobsPrefix } from 'ducks/cronJobs';
import jobsReducer, { prefix as jobsPrefix } from 'ducks/jobs';
import podsReducer, { prefix as podsPrefix } from 'ducks/pods';
import storagesReducer, { prefix as storagesPrefix } from 'ducks/storages';
import networksReducer, { prefix as networksPrefix } from 'ducks/networks';
import namespacesReducer, {
  prefix as namespacesPrefix,
} from 'ducks/namespaces';
import resourceQuotasReducer, {
  prefix as resourceQuotasPrefix,
} from 'ducks/resourceQuotas';
import nodesReducer, { prefix as nodesPrefix } from 'ducks/nodes';
import clustersReducer, { prefix as clustersPrefix } from 'ducks/clusters';
import eventsReducer, { prefix as eventsPrefix } from 'ducks/events';
import userQuotasReducer, { prefix as userQuotasPrefix } from 'ducks/userQuotas';
// import reducers end

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    // combine reducers start
    terminalPage: terminalPageReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    form: formReducer,
    app: appReducer,
    [rolePrefix]: roleReducer,
    [usersPrefix]: usersReducer,
    [serviceLinksPrefix]: serviceLinksReducer,
    [configMapsPrefix]: configMapsReducer,
    [secretsPrefix]: secretsReducer,
    [deploymentsPrefix]: deploymentsReducer,
    [statefulSetsPrefix]: statefulSetsReducer,
    [daemonSetsPrefix]: daemonSetsReducer,
    [cronJobsPrefix]: cronJobsReducer,
    [jobsPrefix]: jobsReducer,
    [podsPrefix]: podsReducer,
    [storagesPrefix]: storagesReducer,
    [networksPrefix]: networksReducer,
    [namespacesPrefix]: namespacesReducer,
    [resourceQuotasPrefix]: resourceQuotasReducer,
    [nodesPrefix]: nodesReducer,
    [clustersPrefix]: clustersReducer,
    [eventsPrefix]: eventsReducer,
    [userQuotasPrefix]: userQuotasReducer,
    // combine reducers end
    ...injectedReducers,
  });

  return rootReducer;
}
