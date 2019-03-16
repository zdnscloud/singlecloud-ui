/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import clustersPageReducer from 'containers/ClustersPage/reducer';
import nodesPageReducer from 'containers/NodesPage/reducer';
import namespacesPageReducer from 'containers/NamespacesPage/reducer';
import deploymentsPageReducer from 'containers/DeploymentsPage/reducer';
import configMapsPageReducer from 'containers/ConfigMapsPage/reducer';
import servicesPageReducer from 'containers/ServicesPage/reducer';
import ingressesPageReducer from 'containers/IngressesPage/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    clustersPage: clustersPageReducer,
    nodesPage: nodesPageReducer,
    namespacesPage: namespacesPageReducer,
    deploymentsPage: deploymentsPageReducer,
    configMapsPage: configMapsPageReducer,
    servicesPage: servicesPageReducer,
    ingressesPage: ingressesPageReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
