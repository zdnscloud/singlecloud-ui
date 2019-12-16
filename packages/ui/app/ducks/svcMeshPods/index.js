/**
 * Duck: SvcMeshPods
 * reducer: svcMeshPods
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
  errorsList: [],
});

const c = constants;

export const reducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_SVC_MESH_PODS:
      return state;
    case c.LOAD_SVC_MESH_PODS_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      const {
        clusterID,
        namespaceID,
        svcMeshWorkloadGroupID,
        svcMeshWorkloadID,
      } = meta;
      return state
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.LOAD_SVC_MESH_PODS_FAILURE))
        .setIn([
          'data',
          clusterID,
          namespaceID,
          svcMeshWorkloadGroupID,
          svcMeshWorkloadID,
        ], fromJS(data))
        .setIn([
          'list',
          clusterID,
          namespaceID,
          svcMeshWorkloadGroupID,
          svcMeshWorkloadID,
        ], fromJS(list));
    }
    case c.LOAD_SVC_MESH_PODS_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));



    case c.READ_SVC_MESH_POD:
      return state;
    case c.READ_SVC_MESH_POD_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      const {
        clusterID,
        namespaceID,
        svcMeshWorkloadGroupID,
        svcMeshWorkloadID,
      } = meta;
      if (id) {
        return state.setIn([
          'data',
          clusterID,
          namespaceID,
          svcMeshWorkloadGroupID,
          svcMeshWorkloadID,
          id,
        ], fromJS(data))
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.READ_SVC_MESH_POD_FAILURE));
      }
      return state;
    }
    case c.READ_SVC_MESH_POD_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));



    case c.CLEAR_ERRORS_LIST:
      return state.update('errorsList', (errors) => errors.clear());

    default:
      return state;
  }
};

export default reducer;
