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
import podsPageReducer from 'containers/PodsPage/reducer';
import configMapsPageReducer from 'containers/ConfigMapsPage/reducer';
import servicesPageReducer from 'containers/ServicesPage/reducer';
import ingressesPageReducer from 'containers/IngressesPage/reducer';
import applicationsPageReducer from 'containers/ApplicationsPage/reducer';
import applicationDetailPagePageReducer from 'containers/ApplicationDetailPage/reducer';

import usersPageReducer from 'containers/UsersPage/reducer';

import roleReducer, { prefix as rolePrefix } from 'ducks/role';

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
    usersPage: usersPageReducer,
    clustersPage: clustersPageReducer,
    nodesPage: nodesPageReducer,
    eventsPage: eventsPageReducer,
    namespacesPage: namespacesPageReducer,
    configMapsPage: configMapsPageReducer,
    servicesPage: servicesPageReducer,
    ingressesPage: ingressesPageReducer,
    applicationsPage: applicationsPageReducer,
    applicationDetailPage: applicationDetailPagePageReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
