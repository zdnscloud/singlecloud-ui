/**
 * Duck: Alarms
 * selectors: alarms
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
 * Direct selector to the alarms domain
 */
export const selectDomain = (state) => state.get(c.prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(selectDomain, (substate) => '/apis/zcloud.cn/v1/alarms');

export const makeSelectData = () =>
  createSelector(selectDomain, (substate) => substate.get('data'));

export const makeSelectAlarms = () =>
  createSelector(
    selectDomain,
    (substate) => substate.getIn(['data']) || substate.clear()
  );

export const makeSelectAlarmsList = () =>
  createSelector(
    selectDomain,
    makeSelectAlarms(),
    (substate, data) =>
      (substate.getIn(['list']) || fromJS([])).map((id) => data.get(id)) ||
      fromJS([])
  );

export const makeSelectUnreadCount = () =>
  createSelector(selectDomain, (substate) => substate.get('unreadCount'));
