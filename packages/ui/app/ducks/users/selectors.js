import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
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

const selectRouter = (state) => state.get('router');

export const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    (routerState) => routerState.get('location')
  );

export const makeSelectUID = () =>
  createSelector(
    createMatchSelector('/users/:user_id'),
    (match) => {
      if (match && match.params) {
        return match.params.user_id;
      }
      return '';
    }
  );

export const makeSelectEditingUser = () =>
  createSelector(
    selectUsersDomain,
    makeSelectUID(),
    (substate, uid) => substate.getIn(['users', uid])
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
