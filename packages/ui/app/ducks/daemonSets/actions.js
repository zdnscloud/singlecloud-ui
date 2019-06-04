import * as c from './constants';

/*
  actions
*/
export const loadDaemonSets = (meta) => ({
  type: c.LOAD_DAEMONSETS,
  payload: {},
  meta,
});

export const loadDaemonSetsSuccess = (resp, meta) => ({
  type: c.LOAD_DAEMONSETS_SUCCESS,
  payload: resp,
  meta,
});

export const loadDaemonSetsFailure = (error, meta) => ({
  type: c.LOAD_DAEMONSETS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const loadDaemonSet = (id, meta) => ({
  type: c.LOAD_DAEMONSET,
  payload: id,
  meta,
});

export const loadDaemonSetSuccess = (resp, meta) => ({
  type: c.LOAD_DAEMONSET_SUCCESS,
  payload: resp,
  meta,
});

export const loadDaemonSetFailure = (error, meta) => ({
  type: c.LOAD_DAEMONSET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createDaemonSet = (data, meta) => ({
  type: c.CREATE_DAEMONSET,
  payload: data,
  meta,
});

export const createDaemonSetSuccess = (resp, meta) => ({
  type: c.CREATE_DAEMONSET_SUCCESS,
  payload: resp,
  meta,
});

export const createDaemonSetFailure = (error, meta) => ({
  type: c.CREATE_DAEMONSET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateDaemonSet = (data, meta) => ({
  type: c.UPDATE_DAEMONSET,
  payload: data,
  meta,
});

export const updateDaemonSetSuccess = (resp) => ({
  type: c.UPDATE_DAEMONSET_SUCCESS,
  payload: resp,
});

export const updateDaemonSetFailure = (error) => ({
  type: c.UPDATE_DAEMONSET_FAILURE,
  payload: error,
  error: true,
});

export const removeDaemonSet = (id, meta) => ({
  type: c.REMOVE_DAEMONSET,
  payload: id,
  meta,
});

export const removeDaemonSetSuccess = (resp, meta) => ({
  type: c.REMOVE_DAEMONSET_SUCCESS,
  payload: resp,
  meta,
});

export const removeDaemonSetFailure = (error, meta) => ({
  type: c.REMOVE_DAEMONSET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const scaleDaemonSet = (scale, meta) => ({
  type: c.SCALE_DAEMONSET,
  payload: scale,
  meta,
});

export const scaleDaemonSetSuccess = (resp, meta) => ({
  type: c.SCALE_DAEMONSET_SUCCESS,
  payload: resp,
  meta,
});

export const scaleDaemonSetFailure = (error, meta) => ({
  type: c.SCALE_DAEMONSET_FAILURE,
  payload: error,
  meta,
  error: true,
});
