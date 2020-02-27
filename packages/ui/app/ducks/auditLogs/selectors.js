/**
 * Duck: AuditLogs
 * selectors: auditLogs
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
 * Direct selector to the auditLogs domain
 */
export const selectDomain = (state) => state.get(c.prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    selectDomain,
    (substate) => '/apis/zcloud.cn/v1/auditlogs'
  );

export const makeSelectData = () =>
  createSelector(
    selectDomain,
    (substate) => substate.get('data')
  );

export const makeSelectAuditLogs = () =>
  createSelector(
    selectDomain,
  (
    substate,
  ) =>
    substate.getIn([
      'data',
      ]) || substate.clear()
  );

export const makeSelectAuditLogsList = () =>
  createSelector(
    selectDomain,
    makeSelectAuditLogs(),
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
     createMatchSelector('*/auditLogs/:id/*'),
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
      .filter(({ type }) => type === c.LOAD_AUDIT_LOGS_FAILURE)
  );





