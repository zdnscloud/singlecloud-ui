import * as c from './constants';

/*
  actions
*/
export const loadCronJobs = (meta) => ({
  type: c.LOAD_CRONJOBS,
  payload: {},
  meta,
});

export const loadCronJobsSuccess = (resp, meta) => ({
  type: c.LOAD_CRONJOBS_SUCCESS,
  payload: resp,
  meta,
});

export const loadCronJobsFailure = (error, meta) => ({
  type: c.LOAD_CRONJOBS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const loadCronJob = (id, meta) => ({
  type: c.LOAD_CRONJOB,
  payload: id,
  meta,
});

export const loadCronJobSuccess = (resp, meta) => ({
  type: c.LOAD_CRONJOB_SUCCESS,
  payload: resp,
  meta,
});

export const loadCronJobFailure = (error, meta) => ({
  type: c.LOAD_CRONJOB_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createCronJob = (data, meta) => ({
  type: c.CREATE_CRONJOB,
  payload: data,
  meta,
});

export const createCronJobSuccess = (resp, meta) => ({
  type: c.CREATE_CRONJOB_SUCCESS,
  payload: resp,
  meta,
});

export const createCronJobFailure = (error, meta) => ({
  type: c.CREATE_CRONJOB_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateCronJob = (data, meta) => ({
  type: c.UPDATE_CRONJOB,
  payload: data,
  meta,
});

export const updateCronJobSuccess = (resp) => ({
  type: c.UPDATE_CRONJOB_SUCCESS,
  payload: resp,
});

export const updateCronJobFailure = (error) => ({
  type: c.UPDATE_CRONJOB_FAILURE,
  payload: error,
  error: true,
});

export const removeCronJob = (id, meta) => ({
  type: c.REMOVE_CRONJOB,
  payload: id,
  meta,
});

export const removeCronJobSuccess = (resp, meta) => ({
  type: c.REMOVE_CRONJOB_SUCCESS,
  payload: resp,
  meta,
});

export const removeCronJobFailure = (error, meta) => ({
  type: c.REMOVE_CRONJOB_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const scaleCronJob = (scale, meta) => ({
  type: c.SCALE_CRONJOB,
  payload: scale,
  meta,
});

export const scaleCronJobSuccess = (resp, meta) => ({
  type: c.SCALE_CRONJOB_SUCCESS,
  payload: resp,
  meta,
});

export const scaleCronJobFailure = (error, meta) => ({
  type: c.SCALE_CRONJOB_FAILURE,
  payload: error,
  meta,
  error: true,
});
