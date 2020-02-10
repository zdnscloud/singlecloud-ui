/**
 * Duck: SvcMeshWorkloads
 * actions: svcMeshWorkloads
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadSvcMeshWorkloads = (url, meta = {}) => ({
  type: c.LOAD_SVC_MESH_WORKLOADS,
  payload: url,
  meta,
});

export const loadSvcMeshWorkloadsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_SVC_MESH_WORKLOADS_SUCCESS,
  payload: resp,
  meta,
});

export const loadSvcMeshWorkloadsFailure = (error, meta = {}) => ({
  type: c.LOAD_SVC_MESH_WORKLOADS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readSvcMeshWorkload = (id, meta = {}) => ({
  type: c.READ_SVC_MESH_WORKLOAD,
  payload: id,
  meta,
});

export const readSvcMeshWorkloadSuccess = (resp, meta = {}) => ({
  type: c.READ_SVC_MESH_WORKLOAD_SUCCESS,
  payload: resp,
  meta,
});

export const readSvcMeshWorkloadFailure = (error, meta = {}) => ({
  type: c.READ_SVC_MESH_WORKLOAD_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
