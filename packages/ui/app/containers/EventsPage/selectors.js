import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the eventsPage state domain
 */

const selectEventsPageDomain = (state) => state.get('eventsPage', initialState);

/**
 * Other specific selectors
 */

export const makeSelectClusterID = () =>
  createSelector(
    selectEventsPageDomain,
    (substate) => substate.get('clusterID')
  );

export const makeSelectEvents = () =>
  createSelector(
    selectEventsPageDomain,
    makeSelectClusterID(),
    (substate, clusterID) => substate.getIn(['events', clusterID]) || fromJS([])
  );

/**
 * Default selector used by EventsPage
 */

export const makeSelectEventsPage = () =>
  createSelector(
    selectEventsPageDomain,
    (substate) => substate
  );

export default makeSelectEventsPage;
