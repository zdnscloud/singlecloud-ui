/**
 * Duck: DaemonSets
 * actions: daemonSets
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadDaemonSets = (url, meta = {}) => ({
  type: c.LOAD_DAEMON_SETS,
  payload: url,
  meta,
});

export const loadDaemonSetsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_DAEMON_SETS_SUCCESS,
  payload: resp,
  meta,
});

export const loadDaemonSetsFailure = (error, meta = {}) => ({
  type: c.LOAD_DAEMON_SETS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createDaemonSet = (data, meta = {}) => ({
  type: c.CREATE_DAEMON_SET,
  payload: data,
  meta,
});

export const createDaemonSetSuccess = (resp, meta = {}) => ({
  type: c.CREATE_DAEMON_SET_SUCCESS,
  payload: resp,
  meta,
});

export const createDaemonSetFailure = (error, meta = {}) => ({
  type: c.CREATE_DAEMON_SET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateDaemonSet = (data, meta = {}) => ({
  type: c.UPDATE_DAEMON_SET,
  payload: data,
  meta,
});

export const updateDaemonSetSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_DAEMON_SET_SUCCESS,
  payload: resp,
  meta,
});

export const updateDaemonSetFailure = (error, meta = {}) => ({
  type: c.UPDATE_DAEMON_SET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readDaemonSet = (id, meta = {}) => ({
  type: c.READ_DAEMON_SET,
  payload: id,
  meta,
});

export const readDaemonSetSuccess = (resp, meta = {}) => ({
  type: c.READ_DAEMON_SET_SUCCESS,
  payload: resp,
  meta,
});

export const readDaemonSetFailure = (error, meta = {}) => ({
  type: c.READ_DAEMON_SET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeDaemonSet = (id, meta = {}) => ({
  type: c.REMOVE_DAEMON_SET,
  payload: id,
  meta,
});

export const removeDaemonSetSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_DAEMON_SET_SUCCESS,
  payload: resp,
  meta,
});

export const removeDaemonSetFailure = (error, meta = {}) => ({
  type: c.REMOVE_DAEMON_SET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const executeDaemonSetAction = (action, data, meta = {}) => ({
  type: c.EXECUTE_DAEMON_SET_ACTION,
  payload: {
    action,
    data,
  },
  meta,
});

export const executeDaemonSetActionSuccess = (resp, meta = {}) => ({
  type: c.EXECUTE_DAEMON_SET_ACTION_SUCCESS,
  payload: resp,
  meta,
});

export const executeDaemonSetActionFailure = (error, meta = {}) => ({
  type: c.EXECUTE_DAEMON_SET_ACTION_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
