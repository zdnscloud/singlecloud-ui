/**
 * Duck: Thresholds
 * actions: thresholds
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadThresholds = (url, meta = {}) => ({
  type: c.LOAD_THRESHOLDS,
  payload: url,
  meta,
});

export const loadThresholdsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_THRESHOLDS_SUCCESS,
  payload: resp,
  meta,
});

export const loadThresholdsFailure = (error, meta = {}) => ({
  type: c.LOAD_THRESHOLDS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateThreshold = (data, meta = {}) => ({
  type: c.UPDATE_THRESHOLD,
  payload: data,
  meta,
});

export const updateThresholdSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_THRESHOLD_SUCCESS,
  payload: resp,
  meta,
});

export const updateThresholdFailure = (error, meta = {}) => ({
  type: c.UPDATE_THRESHOLD_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readThreshold = (id, meta = {}) => ({
  type: c.READ_THRESHOLD,
  payload: id,
  meta,
});

export const readThresholdSuccess = (resp, meta = {}) => ({
  type: c.READ_THRESHOLD_SUCCESS,
  payload: resp,
  meta,
});

export const readThresholdFailure = (error, meta = {}) => ({
  type: c.READ_THRESHOLD_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
