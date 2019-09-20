/**
 * Duck: Namespaces
 * reducer: namespaces
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
  list: {},
  selectedData: null,
});

const c = constants;

export const reducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_NAMESPACES:
      return state;
    case c.LOAD_NAMESPACES_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      const { clusterID } = meta;
      return state
        .setIn(['data', clusterID], fromJS(data))
        .setIn(['list', clusterID], fromJS(list));
    }
    case c.LOAD_NAMESPACES_FAILURE:
      return state;

    case c.CREATE_NAMESPACE:
      return state;
    case c.CREATE_NAMESPACE_SUCCESS: {
      const data = payload.response;
      const { clusterID } = meta;
      return state.setIn(['data', clusterID, data.id], fromJS(data));
    }
    case c.CREATE_NAMESPACE_FAILURE:
      return state;

    case c.READ_NAMESPACE:
      return state;
    case c.READ_NAMESPACE_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      const { clusterID } = meta;
      if (id) {
        return state.setIn(['data', clusterID, id], fromJS(data));
      }
      return state;
    }
    case c.READ_NAMESPACE_FAILURE:
      return state;

    case c.REMOVE_NAMESPACE:
      return state;
    case c.REMOVE_NAMESPACE_SUCCESS: {
      const { id } = meta;
      const { clusterID } = meta;
      return state
        .removeIn(['data', clusterID, id])
        .updateIn(['list', clusterID], (l) => l.filterNot((i) => i === id));
    }
    case c.REMOVE_NAMESPACE_FAILURE:
      return state;

    default:
      return state;
  }
};

export default reducer;
