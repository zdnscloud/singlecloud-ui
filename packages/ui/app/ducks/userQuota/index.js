/**
 * Duck: UserQuota
 * reducer: userQuota
 *
 */
import _ from 'lodash';
import { fromJS } from 'immutable';
import getByKey from '@gsmlg/utils/getByKey';
import { procCollectionData } from '@gsmlg/utils/procData';

import * as constants from './constants';
import * as actions from './actions';

const { prefix } = constants;

export { constants, actions, prefix };

export const initialState = fromJS({
  data: {},
  list: [],
  errorsList: [],
});

const c = constants;

export const reducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_USER_QUOTA:
      return state;
    case c.LOAD_USER_QUOTA_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      return state
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.LOAD_USER_QUOTA_FAILURE))
        .setIn([
          'data',
        ], fromJS(data))
        .setIn([
          'list',
        ], fromJS(list));
    }
    case c.LOAD_USER_QUOTA_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.CREATE_USER_QUOTUM:
      return state;
    case c.CREATE_USER_QUOTUM_SUCCESS: {
      const data = payload.response;
      return state.setIn([
        'data',
        data.id,
      ], fromJS(data))
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.CREATE_USER_QUOTUM_FAILURE));
    }
    case c.CREATE_USER_QUOTUM_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.UPDATE_USER_QUOTUM:
      return state;
    case c.UPDATE_USER_QUOTUM_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      if (id) {
        return state.setIn([
          'data',
          id,
        ], fromJS(data))
          .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.UPDATE_USER_QUOTUM_FAILURE));
      }
      return state;
    }
    case c.UPDATE_USER_QUOTUM_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.READ_USER_QUOTUM:
      return state;
    case c.READ_USER_QUOTUM_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      if (id) {
        return state.setIn([
          'data',
          id,
        ], fromJS(data))
          .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.READ_USER_QUOTUM_FAILURE));
      }
      return state;
    }
    case c.READ_USER_QUOTUM_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.REMOVE_USER_QUOTUM:
      return state;
    case c.REMOVE_USER_QUOTUM_SUCCESS: {
      const { id } = meta;
      return state
        .removeIn([
          'data',
          id,
        ])
        .updateIn([
          'list',
        ], (l) => l.filterNot((i) => i === id))
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.REMOVE_USER_QUOTUM_FAILURE));
    }
    case c.REMOVE_USER_QUOTUM_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.EXECUTE_USER_QUOTUM_ACTION:
      return state;
    case c.EXECUTE_USER_QUOTUM_ACTION_SUCCESS:
      if (meta.patch === true) {
        const {
          id,
        } = meta;
        const data = getByKey(payload, ['response']);
        return state.mergeDeepIn([
          'data',
          id,
        ], data)
          .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.EXECUTE_USER_QUOTUM_ACTION_FAILURE));
      }
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === c.EXECUTE_USER_QUOTUM_ACTION_FAILURE));
    case c.EXECUTE_USER_QUOTUM_ACTION_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.CLEAR_ERRORS_LIST:
      return state.update('errorsList', (errors) => errors.clear());

    default:
      return state;
  }
};

export default reducer;
