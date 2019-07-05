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
      const { clusterID } = meta;
      const { data, list } = procCollectionData(payload);
      return state
        .setIn(['userQuotas', clusterID], fromJS(data))
        .set('list', fromJS(list));
    }
    case c.LOAD_USER_QUOTAS_FAILURE:
      return state;

    case c.CREATE_USER_QUOTA:
      return state;
    case c.CREATE_USER_QUOTA_SUCCESS: {
      const { clusterID } = meta;
      const data = payload.response;
      return state.setIn(['userQuotas', clusterID, data.id], fromJS(data));
    }
    case c.CREATE_USER_QUOTA_FAILURE:
      return state;

    case c.REMOVE_USER_QUOTA:
      return state;
    case c.REMOVE_USER_QUOTA_SUCCESS: {
      const { clusterID, id } = meta;
      return state
        .deleteIn(['userQuotas', clusterID, id])
        .update('list', (l) => l.filterNot((i) => i === id));
    }
    case c.REMOVE_USER_QUOTA_FAILURE:
      return state;

    case c.CHANGE_USER_QUOTA:
      return state.setIn(
        ['selectedUserQuota', payload.clusterID],
        payload.userQuotaID
      );

    default:
      return state;
  }
};

export default userQuotasReducer;
