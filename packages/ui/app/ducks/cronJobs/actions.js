/**
 * Duck: CronJobs
 * actions: cronJobs
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadCronJobs = (url, meta = {}) => ({
  type: c.LOAD_CRON_JOBS,
  payload: url,
  meta,
});

export const loadCronJobsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_CRON_JOBS_SUCCESS,
  payload: resp,
  meta,
});

export const loadCronJobsFailure = (error, meta = {}) => ({
  type: c.LOAD_CRON_JOBS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createCronJob = (data, meta = {}) => ({
  type: c.CREATE_CRON_JOB,
  payload: data,
  meta,
});

export const createCronJobSuccess = (resp, meta = {}) => ({
  type: c.CREATE_CRON_JOB_SUCCESS,
  payload: resp,
  meta,
});

export const createCronJobFailure = (error, meta = {}) => ({
  type: c.CREATE_CRON_JOB_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readCronJob = (id, meta = {}) => ({
  type: c.READ_CRON_JOB,
  payload: id,
  meta,
});

export const readCronJobSuccess = (resp, meta = {}) => ({
  type: c.READ_CRON_JOB_SUCCESS,
  payload: resp,
  meta,
});

export const readCronJobFailure = (error, meta = {}) => ({
  type: c.READ_CRON_JOB_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeCronJob = (id, meta = {}) => ({
  type: c.REMOVE_CRON_JOB,
  payload: id,
  meta,
});

export const removeCronJobSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_CRON_JOB_SUCCESS,
  payload: resp,
  meta,
});

export const removeCronJobFailure = (error, meta = {}) => ({
  type: c.REMOVE_CRON_JOB_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
