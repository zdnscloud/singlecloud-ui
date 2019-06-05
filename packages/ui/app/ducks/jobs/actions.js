import * as c from './constants';

/*
  actions
*/
export const loadJobs = (meta) => ({
  type: c.LOAD_JOBS,
  payload: {},
  meta,
});

export const loadJobsSuccess = (resp, meta) => ({
  type: c.LOAD_JOBS_SUCCESS,
  payload: resp,
  meta,
});

export const loadJobsFailure = (error, meta) => ({
  type: c.LOAD_JOBS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const loadJob = (id, meta) => ({
  type: c.LOAD_JOB,
  payload: id,
  meta,
});

export const loadJobSuccess = (resp, meta) => ({
  type: c.LOAD_JOB_SUCCESS,
  payload: resp,
  meta,
});

export const loadJobFailure = (error, meta) => ({
  type: c.LOAD_JOB_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createJob = (data, meta) => ({
  type: c.CREATE_JOB,
  payload: data,
  meta,
});

export const createJobSuccess = (resp, meta) => ({
  type: c.CREATE_JOB_SUCCESS,
  payload: resp,
  meta,
});

export const createJobFailure = (error, meta) => ({
  type: c.CREATE_JOB_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateJob = (data, meta) => ({
  type: c.UPDATE_JOB,
  payload: data,
  meta,
});

export const updateJobSuccess = (resp) => ({
  type: c.UPDATE_JOB_SUCCESS,
  payload: resp,
});

export const updateJobFailure = (error) => ({
  type: c.UPDATE_JOB_FAILURE,
  payload: error,
  error: true,
});

export const removeJob = (id, meta) => ({
  type: c.REMOVE_JOB,
  payload: id,
  meta,
});

export const removeJobSuccess = (resp, meta) => ({
  type: c.REMOVE_JOB_SUCCESS,
  payload: resp,
  meta,
});

export const removeJobFailure = (error, meta) => ({
  type: c.REMOVE_JOB_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const scaleJob = (scale, meta) => ({
  type: c.SCALE_JOB,
  payload: scale,
  meta,
});

export const scaleJobSuccess = (resp, meta) => ({
  type: c.SCALE_JOB_SUCCESS,
  payload: resp,
  meta,
});

export const scaleJobFailure = (error, meta) => ({
  type: c.SCALE_JOB_FAILURE,
  payload: error,
  meta,
  error: true,
});
