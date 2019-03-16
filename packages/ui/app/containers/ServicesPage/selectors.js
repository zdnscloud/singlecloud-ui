import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the servicesPage state domain
 */

const selectServicesPageDomain = (state) =>
  state.get('servicesPage', initialState);

/**
 * Other specific selectors
 */

export const makeSelectClusterID = () =>
  createSelector(
    selectServicesPageDomain,
    (substate) => substate.get('clusterID'),
  );

export const makeSelectNamespaceID = () =>
  createSelector(
    selectServicesPageDomain,
    (substate) => substate.get('namespaceID'),
  );

export const makeSelectServices = () =>
  createSelector(
    selectServicesPageDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    (substate, clusterID, namespaceID) => substate.getIn(['services', clusterID, namespaceID]),
  );

export const makeSelectTableList = () =>
  createSelector(
    selectServicesPageDomain,
    (substate) => substate.get('tableList'),
  );

export const makeSelectCreateIsOpen = () =>
  createSelector(
    selectServicesPageDomain,
    (substate) => substate.get('createIsOpen'),
  );

export const makeSelectCreateFormData = () =>
  createSelector(
    selectServicesPageDomain,
    (substate) => substate.get('createFormData'),
  );

/**
 * Default selector used by ServicesPage
 */

export const makeSelectServicesPage = () =>
  createSelector(
    selectServicesPageDomain,
    (substate) => substate,
  );

export default makeSelectServicesPage;
