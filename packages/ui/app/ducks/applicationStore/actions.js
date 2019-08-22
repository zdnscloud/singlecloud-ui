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

export const changeChart = (chartID) => ({
  type: c.CHANGE_CHART,
  payload: { chartID },
});




