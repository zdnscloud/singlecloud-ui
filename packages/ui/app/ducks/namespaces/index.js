/**
 *
 * Namespaces Duck
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
  namespaces: {},
  list: [],
  selectedNamespace: {},
});

const c = constants;

export const namespacesReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_NAMESPACES:
      return state;
    case c.LOAD_NAMESPACES_SUCCESS: {
      const { clusterID } = meta;
      const { data, list } = procCollectionData(payload);
      return state
        .setIn(['namespaces', clusterID], fromJS(data))
        .set('list', fromJS(list));
    }
    case c.LOAD_NAMESPACES_FAILURE:
      return state;

    case c.CREATE_NAMESPACE:
      return state;
    case c.CREATE_NAMESPACE_SUCCESS: {
      const { clusterID } = meta;
      const data = payload.response;
      return state.setIn(['namespaces', clusterID, data.id], fromJS(data));
    }
    case c.CREATE_NAMESPACE_FAILURE:
      return state;

    case c.REMOVE_NAMESPACE:
      return state;
    case c.REMOVE_NAMESPACE_SUCCESS: {
      const { clusterID, id } = meta;
      return state
        .deleteIn(['namespaces', clusterID, id])
        .update('list', (l) => l.filterNot((i) => i === id));
    }
    case c.REMOVE_NAMESPACE_FAILURE:
      return state;

    case c.CHANGE_NAMESPACE:
      return state.setIn(
        ['selectedNamespace', payload.clusterID],
        payload.namespaceID
      );

    default:
      return state;
  }
};

export default namespacesReducer;
