import { createSelector } from 'reselect';
import { prefix } from './constants';

/**
 * Direct selector to the users duck
 */

const selectUsersDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectUsers = () =>
  createSelector(
    selectUsersDomain,
    (substate) => substate.get('users')
  );

export const makeSelectUsersList = () =>
  createSelector(
    selectUsersDomain,
    (substate) =>
      substate.get('usersList').map((id) => substate.getIn(['users', id]))
  );

/**
 * Default selector used by LoginPage
 */

const makeSelectUsersDomain = () =>
  createSelector(
    selectUsersDomain,
    (substate) => substate
  );

export default makeSelectUsersDomain;
