import * as c from './constants';

/*
  actions
*/
export const loadApplications = (meta) => ({
  type: c.LOAD_APPLICATIONS,
  payload: {},
  meta,
});

export const loadApplicationsSuccess = (resp, meta) => ({
  type: c.LOAD_APPLICATIONS_SUCCESS,
  payload: resp,
  meta,
});

export const loadApplicationsFailure = (error, meta) => ({
  type: c.LOAD_APPLICATIONS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const loadChart = (url) => ({
  type: c.LOAD_CHART,
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

export const createApplication = (id, meta) => ({
  type: c.CREATE_APPLICATION,
  payload: id,
  meta,
});

export const createApplicationSuccess = (resp, meta) => ({
  type: c.CREATE_APPLICATION_SUCCESS,
  payload: resp,
  meta,
});

export const createApplicationFailure = (error, meta) => ({
  type: c.CREATE_APPLICATION_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeApplication = (id, meta) => ({
  type: c.REMOVE_APPLICATION,
  payload: id,
  meta,
  error: true,
});

export const removeApplicationSuccess = (resp, meta) => ({
  type: c.REMOVE_APPLICATION_SUCCESS,
  payload: resp,
  meta,
});

export const removeApplicationFailure = (error, meta) => ({
  type: c.REMOVE_APPLICATION_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const changeApplication = (applicationID) => ({
  type: c.CHANGE_APPLICATION,
  payload: { applicationID },
});

export const clearDeleteErrorInfo = () => ({
  type: c.CLEAR_DELETE_ERROR_INFO,
  payload: {},
});
