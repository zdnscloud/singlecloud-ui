import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ingressesPage state domain
 */

const selectIngressesPageDomain = (state) =>
  state.get('ingressesPage', initialState);

/**
 * Other specific selectors
 */

export const makeSelectClusterID = () =>
  createSelector(
    selectIngressesPageDomain,
    (substate) => substate.get('clusterID'),
  );

export const makeSelectNamespaceID = () =>
  createSelector(
    selectIngressesPageDomain,
    (substate) => substate.get('namespaceID'),
  );

export const makeSelectIngresses = () =>
  createSelector(
    selectIngressesPageDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    (substate, clusterID, namespaceID) =>
      substate.getIn(['ingresses', clusterID, namespaceID]),
  );

export const makeSelectTableList = () =>
  createSelector(
    selectIngressesPageDomain,
    (substate) => substate.get('tableList'),
  );

export const makeSelectCreateIsOpen = () =>
  createSelector(
    selectIngressesPageDomain,
    (substate) => substate.get('createIsOpen'),
  );

export const makeSelectCreateFormData = () =>
  createSelector(
    selectIngressesPageDomain,
    (substate) => substate.get('createFormData'),
  );

/**
 * Default selector used by IngressesPage
 */

export const makeSelectIngressesPage = () =>
  createSelector(
    selectIngressesPageDomain,
    (substate) => substate,
  );

export default makeSelectIngressesPage;
