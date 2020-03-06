/**
 * Duck: LimitRanges
 * selectors: limitRanges
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
  makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';

import * as c from './constants';
import { initialState } from './index';

/**
 * Direct selector to the limitRanges domain
 */
export const selectDomain = (state) => state.get(c.prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentNamespace(),
    (pt) => pt.getIn(['links', 'limitranges'])
  );

export const makeSelectData = () =>
  createSelector(
    selectDomain,
    (substate) => substate.get('data')
  );

export const makeSelectLimitRanges = () =>
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

export const makeSelectLimitRangesList = () =>
  createSelector(
    selectDomain,
    makeSelectLimitRanges(),
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
    createMatchSelector('*/limitRanges/:id/*'),
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
        .filter(({ type }) => type === c.LOAD_LIMIT_RANGES_FAILURE)
  );

export const makeSelectCreateErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
        .filter(({ type }) => type === c.CREATE_LIMIT_RANGE_FAILURE)
  );

export const makeSelectReadErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
        .filter(({ type }) => type === c.READ_LIMIT_RANGE_FAILURE)
  );

export const makeSelectRemoveErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
        .filter(({ type }) => type === c.REMOVE_LIMIT_RANGE_FAILURE)
  );

