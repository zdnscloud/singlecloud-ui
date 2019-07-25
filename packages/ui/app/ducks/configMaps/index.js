/**
 *
 * ConfigMaps Duck
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
  configMaps: {},
  list: [],
});

const c = constants;

export const configMapsReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_CONFIG_MAPS:
      return state;
    case c.LOAD_CONFIG_MAPS_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const { data, list } = procCollectionData(payload);
      return state
        .setIn(['configMaps', clusterID, namespaceID], fromJS(data))
        .set('list', fromJS(list));
    }
    case c.LOAD_CONFIG_MAPS_FAILURE:
      return state;

    case c.LOAD_CONFIG_MAP:
      return state;
    case c.LOAD_CONFIG_MAP_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const configMap = payload.response;
      return state.setIn(
        ['configMaps', clusterID, namespaceID, configMap.id],
        fromJS(configMap)
      );
    }
    case c.LOAD_CONFIG_MAP_FAILURE:
      return state;

    case c.CREATE_CONFIG_MAP:
      return state;
    case c.CREATE_CONFIG_MAP_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const data = payload.response;
      return state.setIn(
        ['configMaps', clusterID, namespaceID, data.id],
        fromJS(data)
      );
    }

    case c.CREATE_CONFIG_MAP_FAILURE:
      return state;

    case c.UPDATE_CONFIG_MAP:
      return state;
    case c.UPDATE_CONFIG_MAP_SUCCESS:{
      const { clusterID, namespaceID } = meta;
      const data = payload.response;
      return state.setIn(
        ['configMaps', clusterID, namespaceID, data.id],
        fromJS(data)
      );
    }
    case c.UPDATE_CONFIG_MAP_FAILURE:
      return state;

    case c.REMOVE_CONFIG_MAP:
      return state;
    case c.REMOVE_CONFIG_MAP_SUCCESS:
      return state
        .deleteIn(['configMaps', meta.id])
        .update('list', (l) => l.filterNot((id) => id === meta.id));
    case c.REMOVE_CONFIG_MAP_FAILURE:
      return state;

    default:
      return state;
  }
};

export default configMapsReducer;
