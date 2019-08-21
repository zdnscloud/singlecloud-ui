/**
 * Duck: GlobalConfig
 * actions: globalConfig
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadRegistries = (url, meta = {}) => ({
  type: c.LOAD_REGISTRIES,
  payload: url,
  meta,
});

export const loadRegistriesSuccess = (resp, meta = {}) => ({
  type: c.LOAD_REGISTRIES_SUCCESS,
  payload: resp,
  meta,
});

export const loadRegistriesFailure = (error, meta = {}) => ({
  type: c.LOAD_REGISTRIES_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createRegistry = (data, meta = {}) => ({
  type: c.CREATE_REGISTRY,
  payload: data,
  meta,
});

export const createRegistrySuccess = (resp, meta = {}) => ({
  type: c.CREATE_REGISTRY_SUCCESS,
  payload: resp,
  meta,
});

export const createRegistryFailure = (error, meta = {}) => ({
  type: c.CREATE_REGISTRY_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeRegistry = (id, meta = {}) => ({
  type: c.REMOVE_REGISTRY,
  payload: id,
  meta,
});

export const removeRegistrySuccess = (resp, meta = {}) => ({
  type: c.REMOVE_REGISTRY_SUCCESS,
  payload: resp,
  meta,
});

export const removeRegistryFailure = (error, meta = {}) => ({
  type: c.REMOVE_REGISTRY_FAILURE,
  payload: error,
  meta,
  error: true,
});

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


