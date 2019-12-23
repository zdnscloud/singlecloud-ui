/**
 * Duck: Metrics
 * actions: metrics
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadMetrics = (url, meta = {}) => ({
  type: c.LOAD_METRICS,
  payload: url,
  meta,
});

export const loadMetricsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_METRICS_SUCCESS,
  payload: resp,
  meta,
});

export const loadMetricsFailure = (error, meta = {}) => ({
  type: c.LOAD_METRICS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
