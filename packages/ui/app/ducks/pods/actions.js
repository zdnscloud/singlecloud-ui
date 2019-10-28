import * as c from './constants';

/*
  actions
*/
export const loadPods = (url, meta = {}) => ({
  type: c.LOAD_PODS,
  payload: url,
  meta,
});

export const loadPodsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_PODS_SUCCESS,
  payload: resp,
  meta,
});

export const loadPodsFailure = (error, meta = {}) => ({
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
export const loadSTSPods = (url, meta = {}) => ({
  type: c.LOAD_STS_PODS,
  payload: url,
  meta,
});

export const loadSTSPodsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_STS_PODS_SUCCESS,
  payload: resp,
  meta,
});

export const loadSTSPodsFailure = (error, meta = {}) => ({
  type: c.LOAD_STS_PODS_FAILURE,
  payload: error,
  meta,
  error: true,
});

// ds
export const loadDSPods = (url, meta = {}) => ({
  type: c.LOAD_DS_PODS,
  payload: url,
  meta,
});

export const loadDSPodsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_DS_PODS_SUCCESS,
  payload: resp,
  meta,
});

export const loadDSPodsFailure = (error, meta = {}) => ({
  type: c.LOAD_DS_PODS_FAILURE,
  payload: error,
  meta,
  error: true,
});

// cj
export const loadCJPods = (url, meta = {}) => ({
  type: c.LOAD_CJ_PODS,
  payload: url,
  meta,
});

export const loadCJPodsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_CJ_PODS_SUCCESS,
  payload: resp,
  meta,
});

export const loadCJPodsFailure = (error, meta = {}) => ({
  type: c.LOAD_CJ_PODS_FAILURE,
  payload: error,
  meta,
  error: true,
});

// job
export const loadJOBPods = (url, meta = {}) => ({
  type: c.LOAD_JOB_PODS,
  payload: url,
  meta,
});

export const loadJOBPodsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_JOB_PODS_SUCCESS,
  payload: resp,
  meta,
});

export const loadJOBPodsFailure = (error, meta = {}) => ({
  type: c.LOAD_JOB_PODS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removePod = (id, meta = {}) => ({
  type: c.REMOVE_POD,
  payload: id,
  meta,
});

export const removePodSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_POD_SUCCESS,
  payload: resp,
  meta,
});

export const removePodFailure = (error, meta = {}) => ({
  type: c.REMOVE_POD_FAILURE,
  payload: error,
  meta,
  error: true,
});
