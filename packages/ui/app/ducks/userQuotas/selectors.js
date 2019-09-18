/**
 * Duck: Userquotas
 * selectors: userQuotas
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
 * Direct selector to the userQuotas domain
 */
export const selectDomain = (state) => state.get(prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    selectDomain,
    (substate) => '/apis/zcloud.cn/v1/userquotas'
  );

export const makeSelectUserQuotas = () =>
  createSelector(
    selectDomain,

    (substate) => substate.getIn(['data']) || substate.clear()
  );

export const makeSelectUserQuotasList = () =>
  createSelector(
    selectDomain,
    makeSelectUserQuotas(),

    (substate, data) =>
      (substate.getIn(['list']) || fromJS([])).map((id) => data.get(id)) ||
      fromJS([])
  );

export const makeSelectCurrentID = () =>
  createSelector(
    createMatchSelector('*/userQuotas/:id/*'),
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

export const makeSelectDeleteError = () =>
  createSelector(
    selectDomain,
    (state) => state.get('deleteError')
  );
