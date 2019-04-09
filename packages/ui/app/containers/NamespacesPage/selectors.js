import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { makeSelectClusterID, makeSelectNamespaceID } from '../App/selectors';

/**
 * Direct selector to the namespacesPage state domain
 */

const selectNamespacesPageDomain = (state) =>
  state.get('namespacesPage', initialState);

/**
 * Other specific selectors
 */

export const makeSelectNamespaces = () =>
  createSelector(
    selectNamespacesPageDomain,
    makeSelectClusterID(),
    (substate, clusterID) =>
      substate.getIn(['namespaces', clusterID]) || substate.clear()
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

export const makeSelectCurrentNamespace = () =>
  createSelector(
    selectNamespacesPageDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    (substate, clusterID, nid) =>
      substate.getIn(['selectedNamespace', clusterID]) || nid || 'default'
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
