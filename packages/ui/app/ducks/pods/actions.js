import * as c from './constants';

/*
  actions
*/
export const loadPods = (meta) => ({
  type: c.LOAD_PODS,
  payload: {},
  meta,
});

export const loadPodsSuccess = (resp, meta) => ({
  type: c.LOAD_PODS_SUCCESS,
  payload: resp,
  meta,
});

export const loadPodsFailure = (error, meta) => ({
  type: c.LOAD_PODS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const loadPod = (id) => ({
  type: c.LOAD_POD,
  payload: id,
});

export const loadPodSuccess = (resp) => ({
  type: c.LOAD_POD_SUCCESS,
  payload: resp,
});

export const loadPodFailure = (error) => ({
  type: c.LOAD_POD_FAILURE,
  payload: error,
  error: true,
});

export const removePod = (id, meta) => ({
  type: c.REMOVE_POD,
  payload: id,
  meta,
});

export const removePodSuccess = (resp, meta) => ({
  type: c.REMOVE_POD_SUCCESS,
  payload: resp,
  meta,
});

export const removePodFailure = (error, meta) => ({
  type: c.REMOVE_POD_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const openPodLog = (pod, meta) => ({
  type: c.OPEN_POD_LOG,
  payload: pod,
  meta,
});

export const closePodLog = () => ({
  type: c.CLOSE_POD_LOG,
  payload: {},
});

export const setOpeningLogs = (logs) => ({
  type: c.SET_OPENING_LOGS,
  payload: logs,
});
