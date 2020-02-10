import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { initialState, prefix } from './index';

/**
 * Direct selector to the events state domain
 */

export const selectEventsDomain = (state) => state.get(prefix, initialState);

/**
 * Other specific selectors
 */

export const makeSelectClusterID = () =>
  createSelector(selectEventsDomain, (substate) => substate.get('clusterID'));

export const makeSelectEvents = () =>
  createSelector(
    selectEventsDomain,
    makeSelectClusterID(),
    (substate, clusterID) => substate.getIn(['events', clusterID]) || []
  );

export const makeSelectLatestEvents = () =>
  createSelector(
    selectEventsDomain,
    makeSelectClusterID(),
    (substate, clusterID) =>
      (substate.getIn(['events', clusterID]) || []).slice(-100)
  );
