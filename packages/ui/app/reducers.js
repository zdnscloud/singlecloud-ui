/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import appReducer from 'containers/App/reducer';
import clustersPageReducer from 'containers/ClustersPage/reducer';
import nodesPageReducer from 'containers/NodesPage/reducer';
import eventsPageReducer from 'containers/EventsPage/reducer';
import namespacesPageReducer from 'containers/NamespacesPage/reducer';
import servicesPageReducer from 'containers/ServicesPage/reducer';
import ingressesPageReducer from 'containers/IngressesPage/reducer';
import termialPageReducer from 'containers/TerminalPage/reducer';

import roleReducer, { prefix as rolePrefix } from 'ducks/role';
import usersReducer, { prefix as usersPrefix } from 'ducks/users';
import serviceLinksReducer, {
  prefix as serviceLinksPrefix,
} from 'ducks/serviceLinks';
import configMapsReducer, {
  prefix as configMapsPrefix,
} from 'ducks/configMaps';
import deploymentsReducer, {
  prefix as deploymentsPrefix,
} from 'ducks/deployments';
import podsReducer, {
  prefix as podsPrefix,
} from 'ducks/pods';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    form: formReducer,
    app: appReducer,
    [rolePrefix]: roleReducer,
    [usersPrefix]: usersReducer,
    [serviceLinksPrefix]: serviceLinksReducer,
    [configMapsPrefix]: configMapsReducer,
    [deploymentsPrefix]: deploymentsReducer,
    [podsPrefix]: podsReducer,
    clustersPage: clustersPageReducer,
    nodesPage: nodesPageReducer,
    eventsPage: eventsPageReducer,
    namespacesPage: namespacesPageReducer,
    servicesPage: servicesPageReducer,
    ingressesPage: ingressesPageReducer,
    termialPage: termialPageReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
