/**
 * Duck: GlobalConfig
 * selectors: globalConfig
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
 * Direct selector to the registries domain
 */
export const selectDomain = (state) => state.get(prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    selectDomain,
    (substate) => '/apis/zcloud.cn/v1/registries'
  );

export const makeSelectRegistries = () =>
  createSelector(
    selectDomain,

    (substate) =>
      substate.getIn(['data'])
        || substate.clear()
  );

export const makeSelectRegistriesList = () =>
  createSelector(
    selectDomain,
    makeSelectRegistries(),

    (substate, data) =>
      (substate.getIn(['list']) || fromJS([]))
        .map((id) => data.get(id)) || fromJS([])
  );

export const makeSelectCurrentID = () =>
   createSelector(
     createMatchSelector('*/globalConfig/:id/*'),
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
    (substate, id) =>
      substate.getIn(['data', id]) || substate.clear()
  );
