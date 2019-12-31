/**
 * Duck: Monitors
 * actions: monitors
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadMonitors = (url, meta = {}) => ({
  type: c.LOAD_MONITORS,
  payload: url,
  meta,
});

export const loadMonitorsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_MONITORS_SUCCESS,
  payload: resp,
  meta,
});

export const loadMonitorsFailure = (error, meta = {}) => ({
  type: c.LOAD_MONITORS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createMonitor = (data, meta = {}) => ({
  type: c.CREATE_MONITOR,
  payload: data,
  meta,
});

export const createMonitorSuccess = (resp, meta = {}) => ({
  type: c.CREATE_MONITOR_SUCCESS,
  payload: resp,
  meta,
});

export const createMonitorFailure = (error, meta = {}) => ({
  type: c.CREATE_MONITOR_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readMonitor = (id, meta = {}) => ({
  type: c.READ_MONITOR,
  payload: id,
  meta,
});

export const readMonitorSuccess = (resp, meta = {}) => ({
  type: c.READ_MONITOR_SUCCESS,
  payload: resp,
  meta,
});

export const readMonitorFailure = (error, meta = {}) => ({
  type: c.READ_MONITOR_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeMonitor = (id, meta = {}) => ({
  type: c.REMOVE_MONITOR,
  payload: id,
  meta,
});

export const removeMonitorSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_MONITOR_SUCCESS,
  payload: resp,
  meta,
});

export const removeMonitorFailure = (error, meta = {}) => ({
  type: c.REMOVE_MONITOR_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
