/**
 * Duck: Deployments
 * selectors: deployments
 *
 */
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import {
  makeSelectCurrent as makeSelectCurrentNamespace,
  makeSelectCurrentID as makeSelectCurrentNamespaceID,
} from 'ducks/namespaces/selectors';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';

import * as c from './constants';
import { initialState } from './index';

/**
 * Direct selector to the deployments domain
 */
export const selectDomain = (state) => state.get(c.prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(makeSelectCurrentNamespace(), (pt) =>
    pt.getIn(['links', 'deployments'])
  );

export const makeSelectData = () =>
  createSelector(selectDomain, (substate) => substate.get('data'));

export const makeSelectDeployments = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    (substate, clusterID, namespaceID) =>
      substate.getIn(['data', clusterID, namespaceID]) || substate.clear()
  );

export const makeSelectDeploymentsList = () =>
  createSelector(
    selectDomain,
    makeSelectDeployments(),
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    (substate, data, clusterID, namespaceID) =>
      (
        substate.getIn(['list', clusterID, namespaceID]) || fromJS([])
      ).map((id) => data.get(id)) || fromJS([])
  );

export const makeSelectCurrentID = () =>
  createSelector(createMatchSelector('*/deployments/:id/*'), (match) => {
    if (match && match.params) {
      return match.params.id;
    }
    return '';
  });

export const makeSelectCurrent = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    makeSelectCurrentID(),
    (substate, clusterID, namespaceID, id) =>
      substate.getIn(['data', clusterID, namespaceID, id]) || substate.clear()
  );

export const makeSelectErrorsList = () =>
  createSelector(selectDomain, (substate) => substate.get('errorsList'));

export const makeSelectLoadErrorsList = () =>
  createSelector(selectDomain, (substate) =>
    substate
      .get('errorsList')
      .filter(({ type }) => type === c.LOAD_DEPLOYMENTS_FAILURE)
  );

export const makeSelectCreateErrorsList = () =>
  createSelector(selectDomain, (substate) =>
    substate
      .get('errorsList')
      .filter(({ type }) => type === c.CREATE_DEPLOYMENT_FAILURE)
  );

export const makeSelectUpdateErrorsList = () =>
  createSelector(selectDomain, (substate) =>
    substate
      .get('errorsList')
      .filter(({ type }) => type === c.UPDATE_DEPLOYMENT_FAILURE)
  );

export const makeSelectReadErrorsList = () =>
  createSelector(selectDomain, (substate) =>
    substate
      .get('errorsList')
      .filter(({ type }) => type === c.READ_DEPLOYMENT_FAILURE)
  );

export const makeSelectRemoveErrorsList = () =>
  createSelector(selectDomain, (substate) =>
    substate
      .get('errorsList')
      .filter(({ type }) => type === c.REMOVE_DEPLOYMENT_FAILURE)
  );

export const makeSelectActionErrorsList = () =>
  createSelector(selectDomain, (substate) =>
    substate
      .get('errorsList')
      .filter(({ type }) => type === c.EXECUTE_DEPLOYMENT_ACTION_FAILURE)
  );
