import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import { makeSelectUserQuotaID } from 'ducks/app/selectors';
import { prefix } from './constants';

/**
 * Direct selector to the userQuotas duck
 */
export const selectUserQuotasDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    selectUserQuotasDomain,
    (substate) => '/apis/zcloud.cn/v1/userquotas'
  );

export const makeSelectUserQuotas = () =>
  createSelector(
    selectUserQuotasDomain,
    (substate) => substate.get('userQuotas') || substate.clear()
  );

export const makeSelectUserQuotasList = () =>
  createSelector(
    selectUserQuotasDomain,
    makeSelectUserQuotas(),
    (substate, userQuotas) =>
      substate.get('list').map((id) => userQuotas.get(id))
  );

export const makeSelectCurrentUserQuota = () =>
  createSelector(
    selectUserQuotasDomain,
    makeSelectUserQuotaID(),
    (substate, userQuotaID) =>
      substate.getIn(['userQuotas', userQuotaID]) || substate.clear()
  );

export const makeSelectDeleteUserQuotaError = () =>
  createSelector(
    selectUserQuotasDomain,
    (state) => state.get('deleteError')
  );

/**
 * Default selector used by UserQuotas
 */
export default makeSelectUserQuotas;
