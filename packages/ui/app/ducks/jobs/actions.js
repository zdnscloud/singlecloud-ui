/**
 * Duck: Jobs
 * actions: jobs
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadJobs = (url, meta = {}) => ({
  type: c.LOAD_JOBS,
  payload: url,
  meta,
});

export const loadJobsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_JOBS_SUCCESS,
  payload: resp,
  meta,
});

export const loadJobsFailure = (error, meta = {}) => ({
  type: c.LOAD_JOBS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createJob = (data, meta = {}) => ({
  type: c.CREATE_JOB,
  payload: data,
  meta,
});

export const createJobSuccess = (resp, meta = {}) => ({
  type: c.CREATE_JOB_SUCCESS,
  payload: resp,
  meta,
});

export const createJobFailure = (error, meta = {}) => ({
  type: c.CREATE_JOB_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readJob = (id, meta = {}) => ({
  type: c.READ_JOB,
  payload: id,
  meta,
});

export const readJobSuccess = (resp, meta = {}) => ({
  type: c.READ_JOB_SUCCESS,
  payload: resp,
  meta,
});

export const readJobFailure = (error, meta = {}) => ({
  type: c.READ_JOB_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeJob = (id, meta = {}) => ({
  type: c.REMOVE_JOB,
  payload: id,
  meta,
});

export const removeJobSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_JOB_SUCCESS,
  payload: resp,
  meta,
});

export const removeJobFailure = (error, meta = {}) => ({
  type: c.REMOVE_JOB_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
