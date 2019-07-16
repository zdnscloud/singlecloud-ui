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
      const resourceQuota = payload.response;
      // temporary add, may remove when support cancel load data
      if (resourceQuota && resourceQuota.id) {
        return state.setIn(
          ['resourcequotas', clusterID, namespaceID],
          fromJS(resourceQuota)
        );
      }
      return state;
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
    default:
      return state;
  }
};

export default resourceQuotaReducer;
