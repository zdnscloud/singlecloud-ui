/**
 * Duck: LimitRanges
 * actions: limitRanges
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadLimitRanges = (url, meta = {}) => ({
  type: c.LOAD_LIMIT_RANGES,
  payload: url,
  meta,
});

export const loadLimitRangesSuccess = (resp, meta = {}) => ({
  type: c.LOAD_LIMIT_RANGES_SUCCESS,
  payload: resp,
  meta,
});

export const loadLimitRangesFailure = (error, meta = {}) => ({
  type: c.LOAD_LIMIT_RANGES_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createLimitRange = (data, meta = {}) => ({
  type: c.CREATE_LIMIT_RANGE,
  payload: data,
  meta,
});

export const createLimitRangeSuccess = (resp, meta = {}) => ({
  type: c.CREATE_LIMIT_RANGE_SUCCESS,
  payload: resp,
  meta,
});

export const createLimitRangeFailure = (error, meta = {}) => ({
  type: c.CREATE_LIMIT_RANGE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readLimitRange = (id, meta = {}) => ({
  type: c.READ_LIMIT_RANGE,
  payload: id,
  meta,
});

export const readLimitRangeSuccess = (resp, meta = {}) => ({
  type: c.READ_LIMIT_RANGE_SUCCESS,
  payload: resp,
  meta,
});

export const readLimitRangeFailure = (error, meta = {}) => ({
  type: c.READ_LIMIT_RANGE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeLimitRange = (id, meta = {}) => ({
  type: c.REMOVE_LIMIT_RANGE,
  payload: id,
  meta,
});

export const removeLimitRangeSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_LIMIT_RANGE_SUCCESS,
  payload: resp,
  meta,
});

export const removeLimitRangeFailure = (error, meta = {}) => ({
  type: c.REMOVE_LIMIT_RANGE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
