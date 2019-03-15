import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the configMapsPage state domain
 */

const selectConfigMapsPageDomain = (state) =>
  state.get('configMapsPage', initialState);

/**
 * Other specific selectors
 */
export const makeSelectClusterID = () =>
  createSelector(
    selectConfigMapsPageDomain,
    (substate) => substate.get('clusterID'),
  );

export const makeSelectNamespaceID = () =>
  createSelector(
    selectConfigMapsPageDomain,
    (substate) => substate.get('namespaceID'),
  );

export const makeSelectConfigMaps = () =>
  createSelector(
    selectConfigMapsPageDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    (substate, clusterID, namespaceID) =>
      substate.getIn(['configMaps', clusterID, namespaceID]) || Map(),
  );

export const makeSelectTableList = () =>
  createSelector(
    selectConfigMapsPageDomain,
    (substate) => substate.get('tableList'),
  );

export const makeSelectCreateFormData = () =>
  createSelector(
    selectConfigMapsPageDomain,
    (substate) => substate.get('createFormData'),
  );

export const makeSelectOpening = () =>
  createSelector(
    selectConfigMapsPageDomain,
    (substate) => substate.get('opening'),
  );

/**
 * Default selector used by ConfigMapsPage
 */

const makeSelectConfigMapsPage = () =>
  createSelector(
    selectConfigMapsPageDomain,
    (substate) => substate.toJS(),
  );

export default makeSelectConfigMapsPage;
export { selectConfigMapsPageDomain };
