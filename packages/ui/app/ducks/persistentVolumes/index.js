/**
 * Duck: PersistentVolumes
 * reducer: persistentVolumes
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
    case c.LOAD_PERSISTENT_VOLUMES:
      return state;
    case c.LOAD_PERSISTENT_VOLUMES_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      const { clusterID } = meta;
      return state
        .setIn(['data', clusterID], fromJS(data))
        .setIn(['list', clusterID], fromJS(list));
    }
    case c.LOAD_PERSISTENT_VOLUMES_FAILURE:
      return state;

    case c.READ_PERSISTENT_VOLUME:
      return state;
    case c.READ_PERSISTENT_VOLUME_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      const { clusterID } = meta;
      if (id) {
        return state.setIn(['data', clusterID, id], fromJS(data));
      }
      return state;
    }
    case c.READ_PERSISTENT_VOLUME_FAILURE:
      return state;

    case c.REMOVE_PERSISTENT_VOLUME:
      return state;
    case c.REMOVE_PERSISTENT_VOLUME_SUCCESS: {
      const { id } = meta;
      const { clusterID } = meta;
      return state
        .removeIn(['data', clusterID, id])
        .updateIn(['list', clusterID], (l) => l.filterNot((i) => i === id));
    }
    case c.REMOVE_PERSISTENT_VOLUME_FAILURE:
      return state;

    default:
      return state;
  }
};

export default reducer;
