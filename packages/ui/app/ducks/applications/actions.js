/**
 * Duck: Applications
 * actions: applications
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadApplications = (url, meta = {}) => ({
  type: c.LOAD_APPLICATIONS,
  payload: url,
  meta,
});

export const loadApplicationsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_APPLICATIONS_SUCCESS,
  payload: resp,
  meta,
});

export const loadApplicationsFailure = (error, meta = {}) => ({
  type: c.LOAD_APPLICATIONS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createApplication = (data, meta = {}) => ({
  type: c.CREATE_APPLICATION,
  payload: data,
  meta,
});

export const createApplicationSuccess = (resp, meta = {}) => ({
  type: c.CREATE_APPLICATION_SUCCESS,
  payload: resp,
  meta,
});

export const createApplicationFailure = (error, meta = {}) => ({
  type: c.CREATE_APPLICATION_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readApplication = (id, meta = {}) => ({
  type: c.READ_APPLICATION,
  payload: id,
  meta,
});

export const readApplicationSuccess = (resp, meta = {}) => ({
  type: c.READ_APPLICATION_SUCCESS,
  payload: resp,
  meta,
});

export const readApplicationFailure = (error, meta = {}) => ({
  type: c.READ_APPLICATION_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeApplication = (id, meta = {}) => ({
  type: c.REMOVE_APPLICATION,
  payload: id,
  meta,
});

export const removeApplicationSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_APPLICATION_SUCCESS,
  payload: resp,
  meta,
});

export const removeApplicationFailure = (error, meta = {}) => ({
  type: c.REMOVE_APPLICATION_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
