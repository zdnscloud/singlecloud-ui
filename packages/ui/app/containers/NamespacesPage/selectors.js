import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the namespacesPage state domain
 */

const selectNamespacesPageDomain = (state) =>
  state.get('namespacesPage', initialState);

/**
 * Other specific selectors
 */

export const makeSelectClusterID = () =>
  createSelector(
    selectNamespacesPageDomain,
    (substate) => substate.get('clusterID')
  );

export const makeSelectNamespaces = () =>
  createSelector(
    selectNamespacesPageDomain,
    makeSelectClusterID(),
    (substate, clusterID) => substate.getIn(['namespaces', clusterID])
  );

export const makeSelectTableList = () =>
  createSelector(
    selectNamespacesPageDomain,
    (substate) => substate.get('tableList')
  );

export const makeSelectCreateIsOpen = () =>
  createSelector(
    selectNamespacesPageDomain,
    (substate) => substate.get('createIsOpen')
  );

export const makeSelectCreateFormData = () =>
  createSelector(
    selectNamespacesPageDomain,
    (substate) => substate.get('createFormData')
  );

/**
 * Default selector used by NamespacesPage
 */

export const makeSelectNamespacesPage = () =>
  createSelector(
    selectNamespacesPageDomain,
    (substate) => substate
  );

export default makeSelectNamespacesPage;
