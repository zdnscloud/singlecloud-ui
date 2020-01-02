/**
 * Duck: Users
 * selectors: users
 *
 */
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import * as c from './constants';
import { initialState } from './index';

/**
 * Direct selector to the users domain
 */
export const selectDomain = (state) => state.get(c.prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    selectDomain,
    (substate) => '/apis/zcloud.cn/v1/users'
  );

export const makeSelectData = () =>
  createSelector(
    selectDomain,
    (substate) => substate.get('data')
  );

export const makeSelectUsers = () =>
  createSelector(
    selectDomain,
  (
    substate,
  ) =>
    substate.getIn([
      'data',
      ]) || substate.clear()
  );

export const makeSelectUsersList = () =>
  createSelector(
    selectDomain,
    makeSelectUsers(),
    (
      substate,
      data,
    ) =>
      (substate.getIn([
        'list',
      ]) || fromJS([])).map((id) => data.get(id)) || fromJS([])
  );

export const makeSelectCurrentID = () =>
   createSelector(
     createMatchSelector('*/users/:id/*'),
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
    makeSelectCurrentID(),
    (
      substate,
      id
    ) =>
      substate.getIn([
        'data',
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
      .filter(({ type }) => type === c.LOAD_USERS_FAILURE)
  );

export const makeSelectCreateErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
      .filter(({ type }) => type === c.CREATE_USER_FAILURE)
  );

export const makeSelectUpdateErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
      .filter(({ type }) => type === c.UPDATE_USER_FAILURE)
  );

export const makeSelectReadErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
      .filter(({ type }) => type === c.READ_USER_FAILURE)
  );

export const makeSelectRemoveErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
      .filter(({ type }) => type === c.REMOVE_USER_FAILURE)
  );

