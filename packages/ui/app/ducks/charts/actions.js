/**
 * Duck: Charts
 * actions: charts
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadCharts = (url, meta = {}) => ({
  type: c.LOAD_CHARTS,
  payload: url,
  meta,
});

export const loadChartsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_CHARTS_SUCCESS,
  payload: resp,
  meta,
});

export const loadChartsFailure = (error, meta = {}) => ({
  type: c.LOAD_CHARTS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readChart = (id, meta = {}) => ({
  type: c.READ_CHART,
  payload: id,
  meta,
});

export const readChartSuccess = (resp, meta = {}) => ({
  type: c.READ_CHART_SUCCESS,
  payload: resp,
  meta,
});

export const readChartFailure = (error, meta = {}) => ({
  type: c.READ_CHART_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
