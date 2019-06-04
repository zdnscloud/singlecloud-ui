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

// sts
export const loadSTSPods = (meta) => ({
  type: c.LOAD_STS_PODS,
  payload: {},
  meta,
});

export const loadSTSPodsSuccess = (resp, meta) => ({
  type: c.LOAD_STS_PODS_SUCCESS,
  payload: resp,
  meta,
});

export const loadSTSPodsFailure = (error, meta) => ({
  type: c.LOAD_STS_PODS_FAILURE,
  payload: error,
  meta,
  error: true,
});

// ds
export const loadDSPods = (meta) => ({
  type: c.LOAD_DS_PODS,
  payload: {},
  meta,
});

export const loadDSPodsSuccess = (resp, meta) => ({
  type: c.LOAD_DS_PODS_SUCCESS,
  payload: resp,
  meta,
});

export const loadDSPodsFailure = (error, meta) => ({
  type: c.LOAD_DS_PODS_FAILURE,
  payload: error,
  meta,
  error: true,
});
