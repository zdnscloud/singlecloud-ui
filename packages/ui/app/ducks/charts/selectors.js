/**
 * Duck: Charts
 * selectors: charts
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
 * Direct selector to the charts domain
 */
export const selectDomain = (state) => state.get(prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentNamespace(),
    (pt) => pt.getIn(['links', 'charts'])
  );

export const makeSelectCharts = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),

    (substate, clusterID, namespaceID) =>
      substate.getIn(['data', clusterID, namespaceID]) || substate.clear()
  );

export const makeSelectChartsList = () =>
  createSelector(
    selectDomain,
    makeSelectCharts(),
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),

    (substate, data, clusterID, namespaceID) =>
      (substate.getIn(['list', clusterID, namespaceID]) || fromJS([])).map(
        (id) => data.get(id)
      ) || fromJS([])
  );

export const makeSelectCurrentID = () =>
  createSelector(
    createMatchSelector('*/charts/:id/*'),
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
