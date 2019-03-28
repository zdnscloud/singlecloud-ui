/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import appReducer from 'containers/App/reducer';
import clustersPageReducer from 'containers/ClustersPage/reducer';
import nodesPageReducer from 'containers/NodesPage/reducer';
import eventsPageReducer from 'containers/EventsPage/reducer';
import namespacesPageReducer from 'containers/NamespacesPage/reducer';
import deploymentsPageReducer from 'containers/DeploymentsPage/reducer';
import podsPageReducer from 'containers/PodsPage/reducer';
import configMapsPageReducer from 'containers/ConfigMapsPage/reducer';
import servicesPageReducer from 'containers/ServicesPage/reducer';
import ingressesPageReducer from 'containers/IngressesPage/reducer';
import applicationsPageReducer from 'containers/ApplicationsPage/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    app: appReducer,
    clustersPage: clustersPageReducer,
    nodesPage: nodesPageReducer,
    eventsPage: eventsPageReducer,
    namespacesPage: namespacesPageReducer,
    deploymentsPage: deploymentsPageReducer,
    configMapsPage: configMapsPageReducer,
    servicesPage: servicesPageReducer,
    ingressesPage: ingressesPageReducer,
    podsPage: podsPageReducer,
    applicationsPage: applicationsPageReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
