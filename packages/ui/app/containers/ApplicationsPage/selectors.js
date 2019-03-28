import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { makeSelectClusterID as sid } from '../App/selectors';

/**
 * Direct selector to the applicationsPage state domain
 */

export const selectApplicationsPageDomain = (state) =>
  state.get('applicationsPage', initialState);

/**
 * Other specific selectors
 */
export const makeSelectClusterID = sid;

export const makeSelectNamespaceID = () =>
  createSelector(
    selectApplicationsPageDomain,
    (substate) => substate.get('namespaceID')
  );

export const makeSelectApplications = () =>
  createSelector(
    selectApplicationsPageDomain,
    makeSelectClusterID(),
    makeSelectNamespaceID(),
    (substate, clusterID, namespaceID) =>
      substate.getIn(['applications', clusterID, namespaceID]) || Map()
  );

export const makeSelectTableList = () =>
  createSelector(
    selectApplicationsPageDomain,
    (substate) => substate.get('tableList')
  );

export const makeSelectCreateFormData = () =>
  createSelector(
    selectApplicationsPageDomain,
    (substate) => substate.get('createFormData')
  );

export const makeSelectFormPorts = () =>
  createSelector(
    makeSelectCreateFormData(),
    (substate) =>
      substate
        .get('containers')
        .map((ctn) =>
          ctn
            .get('exposedPorts')
            .filter((p) => typeof p.get('port') === 'number')
        )
        .flatten(true)
  );

/**
 * Default selector used by ApplicationsPage
 */

const makeSelectApplicationsPage = () =>
  createSelector(
    selectApplicationsPageDomain,
    (substate) => substate.toJS()
  );

export default makeSelectApplicationsPage;
