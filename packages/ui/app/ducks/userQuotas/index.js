/**
 * Duck: UserQuotas
 * reducer: userQuotas
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
  selectedData: null,
});

const c = constants;

export const reducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_USER_QUOTAS:
      return state;
    case c.LOAD_USER_QUOTAS_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      return state.setIn(['data'], fromJS(data)).setIn(['list'], fromJS(list));
    }
    case c.LOAD_USER_QUOTAS_FAILURE:
      return state;

    case c.CREATE_USER_QUOTA:
      return state;
    case c.CREATE_USER_QUOTA_SUCCESS: {
      const data = payload.response;
      return state.setIn(['data', data.id], fromJS(data));
    }
    case c.CREATE_USER_QUOTA_FAILURE:
      return state;

    case c.UPDATE_USER_QUOTA:
      return state;
    case c.UPDATE_USER_QUOTA_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      if (id) {
        return state.setIn(['data', id], fromJS(data));
      }
      return state;
    }
    case c.UPDATE_USER_QUOTA_FAILURE:
      return state;

    case c.READ_USER_QUOTA:
      return state;
    case c.READ_USER_QUOTA_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      if (id) {
        return state.setIn(['data', id], fromJS(data));
      }
      return state;
    }
    case c.READ_USER_QUOTA_FAILURE:
      return state;

    case c.REMOVE_USER_QUOTA:
      return state;
    case c.REMOVE_USER_QUOTA_SUCCESS: {
      const { id } = meta;
      return state
        .removeIn(['data', id])
        .updateIn(['list'], (l) => l.filterNot((i) => i === id));
    }
    case c.REMOVE_USER_QUOTA_FAILURE:
      return state;

    case c.EXECUTE_USER_QUOTA_ACTION:
      return state;
    case c.EXECUTE_USER_QUOTA_ACTION_SUCCESS:
      return state;
    case c.EXECUTE_USER_QUOTA_ACTION_FAILURE:
      return state;

    default:
      return state;
  }
};

export default reducer;
