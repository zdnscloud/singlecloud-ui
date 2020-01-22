/**
 * Duck: SvcMeshTap
 * actions: svcMeshTap
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const svcMeshTapStart = (params, meta = {}) => ({
  type: c.SVC_MESH_TAP_START,
  payload: params,
  meta,
});

export const svcMeshTapStop = (params, meta = {}) => ({
  type: c.SVC_MESH_TAP_STOP,
  payload: params,
  meta,
});

export const svcMeshTapReset = (params, meta = {}) => ({
  type: c.SVC_MESH_TAP_RESET,
  payload: params,
  meta,
});

export const svcMeshTapAdd = (data, meta = {}) => ({
  type: c.SVC_MESH_TAP_ADD,
  payload: data,
  meta,
});
