/**
 * Duck: Configmaps
 * reducer: configMaps
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
    case c.LOAD_CONFIG_MAPS:
      return state;
    case c.LOAD_CONFIG_MAPS_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      const {
        clusterID, namespaceID,
      } = meta;
      return state
        .setIn(['data', clusterID, namespaceID], fromJS(data))
        .setIn(['list', clusterID, namespaceID], fromJS(list));
    }
    case c.LOAD_CONFIG_MAPS_FAILURE:
      return state;


    case c.CREATE_CONFIG_MAP:
      return state;
    case c.CREATE_CONFIG_MAP_SUCCESS: {
      const data = payload.response;
      const {
        clusterID, namespaceID,
      } = meta;
      return state.setIn(['data', clusterID, namespaceID, data.id], fromJS(data));
    }
    case c.CREATE_CONFIG_MAP_FAILURE:
      return state;

    case c.UPDATE_CONFIG_MAP:
      return state;
    case c.UPDATE_CONFIG_MAP_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      const {
        clusterID, namespaceID,
      } = meta;
      if (id) {
        return state.setIn(['data', clusterID, namespaceID, id], fromJS(data));
      }
      return state;
    }
    case c.UPDATE_CONFIG_MAP_FAILURE:
      return state;

    case c.READ_CONFIG_MAP:
      return state;
    case c.READ_CONFIG_MAP_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      const {
        clusterID, namespaceID,
      } = meta;
      if (id) {
        return state.setIn(['data', clusterID, namespaceID, id], fromJS(data));
      }
      return state;
    }
    case c.READ_CONFIG_MAP_FAILURE:
      return state;

    case c.REMOVE_CONFIG_MAP:
      return state;
    case c.REMOVE_CONFIG_MAP_SUCCESS: {
      const { id } = meta;
      const {
        clusterID, namespaceID,
      } = meta;
      return state
        .removeIn(['data', clusterID, namespaceID, id])
        .updateIn(['list', clusterID, namespaceID], (l) => l.filterNot((i) => i === id));
    }
    case c.REMOVE_CONFIG_MAP_FAILURE:
      return state;

    default:
      return state;
  }
};

export default reducer;
