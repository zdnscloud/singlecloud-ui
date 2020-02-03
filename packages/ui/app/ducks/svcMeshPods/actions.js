/**
 * Duck: SvcMeshPods
 * actions: svcMeshPods
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadSvcMeshPods = (url, meta = {}) => ({
  type: c.LOAD_SVC_MESH_PODS,
  payload: url,
  meta,
});

export const loadSvcMeshPodsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_SVC_MESH_PODS_SUCCESS,
  payload: resp,
  meta,
});

export const loadSvcMeshPodsFailure = (error, meta = {}) => ({
  type: c.LOAD_SVC_MESH_PODS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readSvcMeshPod = (id, meta = {}) => ({
  type: c.READ_SVC_MESH_POD,
  payload: id,
  meta,
});

export const readSvcMeshPodSuccess = (resp, meta = {}) => ({
  type: c.READ_SVC_MESH_POD_SUCCESS,
  payload: resp,
  meta,
});

export const readSvcMeshPodFailure = (error, meta = {}) => ({
  type: c.READ_SVC_MESH_POD_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
