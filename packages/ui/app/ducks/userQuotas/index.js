/**
 *
 * UserQuotas Duck
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
  userQuotas: {},
  list: [],
  selectedUserQuota: {},
  deleteError: '',
});

const c = constants;

export const userQuotasReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_USER_QUOTAS:
      return state;
    case c.LOAD_USER_QUOTAS_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      return state.set('userQuotas', fromJS(data)).set('list', fromJS(list));
    }
    case c.LOAD_USER_QUOTAS_FAILURE:
      return state;

    case c.CREATE_USER_QUOTA:
      return state;
    case c.CREATE_USER_QUOTA_SUCCESS: {
      const data = payload.response;
      return state.setIn(['userQuotas', data.id], fromJS(data));
    }
    case c.CREATE_USER_QUOTA_FAILURE:
      return state;

    case c.REMOVE_USER_QUOTA:
      return state;
    case c.REMOVE_USER_QUOTA_SUCCESS: {
      const { id } = meta;
      return state
        .deleteIn(['userQuotas', id])
        .update('list', (l) => l.filterNot((i) => i === id));
    }
    case c.REMOVE_USER_QUOTA_FAILURE:
      const data = payload.response.message;
      return state.set('deleteError', data);

    case c.CLEAR_DELETE_ERROR_INFO:
      return state.set('deleteError', '');

    case c.UPDATE_USER_QUOTA:
      return state;
    case c.UPDATE_USER_QUOTA_SUCCESS: {
      const data = payload.response;
      return state.setIn(['userQuotas', data.id], fromJS(data));
    }
    case c.UPDATE_USER_QUOTA_FAILURE:
      return state;

    case c.REQUEST_USER_QUOTA:
      return state;
    case c.REQUEST_USER_QUOTA_SUCCESS: {
      const data = payload.response;
      return state;
    }
    case c.REQUEST_USER_QUOTA_FAILURE:
      return state;

    case c.CHANGE_USER_QUOTA:
      return state.setIn(['selectedUserQuota'], payload.userQuotaID);

    default:
      return state;
  }
};

export default userQuotasReducer;
