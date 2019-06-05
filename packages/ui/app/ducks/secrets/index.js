/**
 *
 * Secrets Duck
 *
 */
import { fromJS } from 'immutable';
import getByKey from '@gsmlg/utils/getByKey';
import { procCollectionData } from '@gsmlg/utils/procData';

import * as constants from './constants';
import * as actions from './actions';

const { prefix } = constants;

export { constants, actions, prefix };

export const initialState = fromJS({
  secrets: {},
  list: [],
});

const c = constants;

export const secretsReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_SECRETS:
      return state;
    case c.LOAD_SECRETS_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const { data, list } = procCollectionData(payload);
      return state
        .setIn(['secrets', clusterID, namespaceID], fromJS(data))
        .set('list', fromJS(list));
    }
    case c.LOAD_SECRETS_FAILURE:
      return state;

    case c.LOAD_SECRET:
      return state;
    case c.LOAD_SECRET_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const secret = payload.response;
      return state.setIn(['secrets', clusterID, namespaceID, secret.id], fromJS(secret));
    }
    case c.LOAD_SECRET_FAILURE:
      return state;

    case c.CREATE_SECRET:
      return state;
    case c.CREATE_SECRET_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const data = payload.response;
      return state.setIn(['secrets', clusterID, namespaceID, data.id], fromJS(data));
    }

    case c.CREATE_SECRET_FAILURE:
      return state;

    case c.UPDATE_SECRET:
      return state;
    case c.UPDATE_SECRET_SUCCESS:
      return state;
    case c.UPDATE_SECRET_FAILURE:
      return state;

    case c.REMOVE_SECRET:
      return state;
    case c.REMOVE_SECRET_SUCCESS:
      return state
        .deleteIn(['secrets', meta.id])
        .update('list', (l) => l.filterNot((id) => id === meta.id));
    case c.REMOVE_SECRET_FAILURE:
      return state;

    default:
      return state;
  }
};

export default secretsReducer;
