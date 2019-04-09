import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the usersPage state domain
 */

const selectUsersPageDomain = (state) =>
  state.get('usersPage', initialState);

/**
 * Other specific selectors
 */
export const makeSelectUsers = () =>
  createSelector(
    selectUsersPageDomain,
    (substate) => substate.get('users') || substate.clear()
  );

export const makeSelectTableList = () =>
  createSelector(
    selectUsersPageDomain,
    (substate) => substate.get('tableList')
  );

/**
 * Default selector used by UsersPage
 */

export const makeSelectUsersPage = () =>
  createSelector(
    selectUsersPageDomain,
    (substate) => substate
  );

export default makeSelectUsersPage;
