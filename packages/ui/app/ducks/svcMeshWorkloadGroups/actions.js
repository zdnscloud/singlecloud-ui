/**
 * Duck: SvcMeshWorkloadGroups
 * actions: svcMeshWorkloadGroups
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadSvcMeshWorkloadGroups = (url, meta = {}) => ({
  type: c.LOAD_SVC_MESH_WORKLOAD_GROUPS,
  payload: url,
  meta,
});

export const loadSvcMeshWorkloadGroupsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_SVC_MESH_WORKLOAD_GROUPS_SUCCESS,
  payload: resp,
  meta,
});

export const loadSvcMeshWorkloadGroupsFailure = (error, meta = {}) => ({
  type: c.LOAD_SVC_MESH_WORKLOAD_GROUPS_FAILURE,
  payload: error,
  meta,
  error: true,
});






export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
