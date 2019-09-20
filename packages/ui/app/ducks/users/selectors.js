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
import { prefix } from './constants';
import { initialState } from './index';

/**
 * Direct selector to the users domain
 */
export const selectDomain = (state) => state.get(prefix) || initialState;

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
    (substate) => substate.getIn(['data']) || substate.clear()
  );

export const makeSelectUsersList = () =>
  createSelector(
    selectDomain,
    makeSelectUsers(),
    (substate, data) =>
      (substate.getIn(['list']) || fromJS([])).map((id) => data.get(id)) ||
      fromJS([])
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
    (substate, id) => substate.getIn(['data', id]) || substate.clear()
  );
