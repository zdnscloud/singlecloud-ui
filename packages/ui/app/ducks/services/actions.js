/**
 * Duck: Services
 * actions: services
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadServices = (url, meta = {}) => ({
  type: c.LOAD_SERVICES,
  payload: url,
  meta,
});

export const loadServicesSuccess = (resp, meta = {}) => ({
  type: c.LOAD_SERVICES_SUCCESS,
  payload: resp,
  meta,
});

export const loadServicesFailure = (error, meta = {}) => ({
  type: c.LOAD_SERVICES_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createService = (data, meta = {}) => ({
  type: c.CREATE_SERVICE,
  payload: data,
  meta,
});

export const createServiceSuccess = (resp, meta = {}) => ({
  type: c.CREATE_SERVICE_SUCCESS,
  payload: resp,
  meta,
});

export const createServiceFailure = (error, meta = {}) => ({
  type: c.CREATE_SERVICE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readService = (id, meta = {}) => ({
  type: c.READ_SERVICE,
  payload: id,
  meta,
});

export const readServiceSuccess = (resp, meta = {}) => ({
  type: c.READ_SERVICE_SUCCESS,
  payload: resp,
  meta,
});

export const readServiceFailure = (error, meta = {}) => ({
  type: c.READ_SERVICE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeService = (id, meta = {}) => ({
  type: c.REMOVE_SERVICE,
  payload: id,
  meta,
});

export const removeServiceSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_SERVICE_SUCCESS,
  payload: resp,
  meta,
});

export const removeServiceFailure = (error, meta = {}) => ({
  type: c.REMOVE_SERVICE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
