/**
 *
 * Storages Duck
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
  storageClasses: {},
  storages: {},
  storagesList: [],
  nfsStorages: {},
  lvmStorages: {},
});

const c = constants;

export const storagesReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_STORAGECLASSES:
      return state;
    case c.LOAD_STORAGECLASSES_SUCCESS: {
      const { clusterID } = meta;
      const { data, list } = procCollectionData(payload);
      return state.setIn(['storageClasses', clusterID], fromJS(data));
    }
    case c.LOAD_STORAGECLASSES_FAILURE:
      return state;

    case c.LOAD_STORAGES:
      return state;
    case c.LOAD_STORAGES_SUCCESS: {
      const { clusterID } = meta;
      const { data, list } = procCollectionData(payload, { generateID: true });
      return state
        .setIn(['storages', clusterID], fromJS(data))
        .set('storagesList', fromJS(list));
    }
    case c.LOAD_STORAGES_FAILURE:
      return state;

    case c.LOAD_NFS_STORAGES:
      return state;
    case c.LOAD_NFS_STORAGES_SUCCESS: {
      const { clusterID } = meta;
      const data = payload.response;
      return state.setIn(['nfsStorages', clusterID], fromJS(data));
    }
    case c.LOAD_NFS_STORAGES_FAILURE:
      return state;

    case c.LOAD_LVM_STORAGES:
      return state;
    case c.LOAD_LVM_STORAGES_SUCCESS: {
      const { clusterID } = meta;
      const data = payload.response;
      return state.setIn(['lvmStorages', clusterID], fromJS(data));
    }
    case c.LOAD_LVM_STORAGES_FAILURE:
      return state;

    default:
      return state;
  }
};

export default storagesReducer;
