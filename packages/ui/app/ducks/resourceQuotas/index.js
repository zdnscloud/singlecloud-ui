/* eslint-disable no-undef */
/**
 *
 * ResourceQuota Duck
 *
 */
import { fromJS } from 'immutable';
import { procCollectionData } from '@gsmlg/utils/procData';

import * as constants from './constants';
import * as actions from './actions';

const { prefix } = constants;

export { constants, actions, prefix };

const c = constants;

export const initialState = fromJS({
  resourceQuota: {},
});

export const resourceQuotaReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_RESOURCE_QUOTA:
      return state;
    case c.LOAD_RESOURCE_QUOTA_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const { data, list } = procCollectionData(payload);
      return state
        .setIn(['resourcequotas', clusterID], fromJS(data))
        .set('list', fromJS(list));
    }
    case c.LOAD_RESOURCE_QUOTA_FAILURE:
      return state;

    case c.CREATE_RESOURCE_QUOTA:
      return state;
    case c.CREATE_RESOURCE_QUOTA_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const data = payload.response;
      return state.setIn(
        ['resourcequotas', clusterID, namespaceID, data.id],
        fromJS(data)
      );
    }
    case c.CREATE_RESOURCE_QUOTA_FAILURE:
      return state;

    case c.UPDATE_RESOURCE_QUOTA:
      return state;
    case c.UPDATE_RESOURCE_QUOTA_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const data = payload.response;
      return state.setIn(
        ['resourcequotas', clusterID, namespaceID, data.id],
        fromJS(data)
      );
    }
    case c.UPDATE_RESOURCE_QUOTA_FAILURE:
      return state;

    default:
      return state;
  }
};

export default resourceQuotaReducer;
