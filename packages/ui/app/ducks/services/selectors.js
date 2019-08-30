/**
 * Duck: Services
 * selectors: services
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

import { prefix } from './constants';
import { initialState } from './index';

/**
 * Direct selector to the services domain
 */
export const selectDomain = (state) => state.get(prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentNamespace(),
    (pt) => pt.getIn(['links', 'services'])
  );

export const makeSelectServices = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),

    (substate, clusterID, namespaceID) =>
      substate.getIn(['data', clusterID, namespaceID]) || substate.clear()
  );

export const makeSelectServicesList = () =>
  createSelector(
    selectDomain,
    makeSelectServices(),
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),

    (substate, data, clusterID, namespaceID) =>
      (substate.getIn(['list', clusterID, namespaceID]) || fromJS([])).map(
        (id) => data.get(id)
      ) || fromJS([])
  );

export const makeSelectCurrentID = () =>
  createSelector(
    createMatchSelector('*/services/:id/*'),
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
    (substate, clusterID, namespaceID, id) =>
      substate.getIn(['data', clusterID, namespaceID, id]) || substate.clear()
  );
