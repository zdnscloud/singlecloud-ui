import * as c from './constants';

/*
  actions
*/
export const loadCharts = (url) => ({
  type: c.LOAD_CHARTS,
  payload: url,
});

export const loadChartsSuccess = (resp, chartID) => ({
  type: c.LOAD_CHARTS_SUCCESS,
  payload: resp,
  meta: { chartID },
});

export const loadChartsFailure = (error, chartID) => ({
  type: c.LOAD_CHARTS_FAILURE,
  payload: error,
  meta: { chartID },
  error: true,
});

export const createChart = (id, meta) => ({
  type: c.CREATE_CHART,
  payload: id,
  meta,
});

export const loadChart = (url) => ({
  type: c.LOAD_CHARTS,
  payload: url,
});

export const loadChartSuccess = (resp, chartID) => ({
  type: c.LOAD_CHART_SUCCESS,
  payload: resp,
  meta: { chartID },
});

export const loadChartFailure = (error, chartID) => ({
  type: c.LOAD_CHART_FAILURE,
  payload: error,
  meta: { chartID },
  error: true,
});

export const createChartSuccess = (resp, meta) => ({
  type: c.CREATE_CHART_SUCCESS,
  payload: resp,
  meta,
});

export const createChartFailure = (error, meta) => ({
  type: c.CREATE_CHART_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const changeChart = (chartID) => ({
  type: c.CHANGE_CHART,
  payload: { chartID },
});


