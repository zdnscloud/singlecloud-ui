/**
 * Duck: Secrets
 * selectors: secrets
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
} from 'ducks/namespaces/selectors';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import * as c from './constants';
import { initialState } from './index';

/**
 * Direct selector to the secrets domain
 */
export const selectDomain = (state) => state.get(c.prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentNamespace(),
    (pt) => pt.getIn(['links', 'secrets'])
  );

export const makeSelectData = () =>
  createSelector(
    selectDomain,
    (substate) => substate.get('data')
  );

export const makeSelectSecrets = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
  (
    substate,
      clusterID,
      namespaceID,
  ) =>
    substate.getIn([
      'data',
      clusterID,
      namespaceID,
      ]) || substate.clear()
  );

export const makeSelectSecretsList = () =>
  createSelector(
    selectDomain,
    makeSelectSecrets(),
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    (
      substate,
      data,
      clusterID,
      namespaceID,
    ) =>
      (substate.getIn([
        'list',
        clusterID,
        namespaceID,
      ]) || fromJS([])).map((id) => data.get(id)) || fromJS([])
  );

export const makeSelectCurrentID = () =>
   createSelector(
     createMatchSelector('*/secrets/:id/*'),
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
    makeSelectCurrentID(),
    (
      substate,
      clusterID,
      namespaceID,
      id
    ) =>
      substate.getIn([
        'data',
        clusterID,
        namespaceID,
        id,
      ]) || substate.clear()
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
      substate.get('errorsList')
      .filter(({ type }) => type === c.LOAD_SECRETS_FAILURE)
  );

export const makeSelectCreateErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
      .filter(({ type }) => type === c.CREATE_SECRET_FAILURE)
  );

export const makeSelectUpdateErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
      .filter(({ type }) => type === c.UPDATE_SECRET_FAILURE)
  );

export const makeSelectReadErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
      .filter(({ type }) => type === c.READ_SECRET_FAILURE)
  );

export const makeSelectRemoveErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
      .filter(({ type }) => type === c.REMOVE_SECRET_FAILURE)
  );

