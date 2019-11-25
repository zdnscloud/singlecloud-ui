/**
 * Duck: Fluentbitconfigs
 * selectors: fluentbitconfigs
 *
 */
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import {
  makeSelectCurrent as makeSelectCurrentDeployment,
  makeSelectCurrentID as makeSelectCurrentDeploymentID,
} from 'ducks/deployments/selectors';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';

import * as c from './constants';
import { initialState } from './index';

/**
 * Direct selector to the fluentbitconfigs domain
 */
export const selectDomain = (state) => state.get(c.prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentDeployment(),
    (pt) => pt.getIn(['links', 'fluentbitconfigs'])
  );

export const makeSelectData = () =>
  createSelector(
    selectDomain,
    (substate) => substate.get('data')
  );

export const makeSelectFluentbitconfigs = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    makeSelectCurrentDeploymentID(),
    (substate, clusterID, namespaceID, deploymentID) =>
      substate.getIn(['data', clusterID, namespaceID, deploymentID]) ||
      substate.clear()
  );

export const makeSelectFluentbitconfigsList = () =>
  createSelector(
    selectDomain,
    makeSelectFluentbitconfigs(),
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    makeSelectCurrentDeploymentID(),
    (substate, data, clusterID, namespaceID, deploymentID) =>
      (
        substate.getIn(['list', clusterID, namespaceID, deploymentID]) ||
        fromJS([])
      ).map((id) => data.get(id)) || fromJS([])
  );

export const makeSelectCurrentID = () =>
  createSelector(
    createMatchSelector('*/fluentbitconfigs/:id/*'),
    (match) => {
      if (match && match.params) {
        return match.params.id;
      }
      return '';
    }
  );

export const makeSelectCurrent = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    makeSelectCurrentDeploymentID(),
    makeSelectCurrentID(),
    (substate, clusterID, namespaceID, deploymentID, id) =>
      substate.getIn(['data', clusterID, namespaceID, deploymentID, id]) ||
      substate.clear()
  );

export const makeSelectErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) => substate.get('errorsList')
  );

export const makeSelectLoadErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate
        .get('errorsList')
        .filter(({ type }) => type === c.LOAD_FLUENTBITCONFIGS_FAILURE)
  );

export const makeSelectCreateErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate
        .get('errorsList')
        .filter(({ type }) => type === c.CREATE_FLUENTBITCONFIG_FAILURE)
  );

export const makeSelectUpdateErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate
        .get('errorsList')
        .filter(({ type }) => type === c.UPDATE_FLUENTBITCONFIG_FAILURE)
  );

export const makeSelectReadErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate
        .get('errorsList')
        .filter(({ type }) => type === c.READ_FLUENTBITCONFIG_FAILURE)
  );

export const makeSelectRemoveErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate
        .get('errorsList')
        .filter(({ type }) => type === c.REMOVE_FLUENTBITCONFIG_FAILURE)
  );
