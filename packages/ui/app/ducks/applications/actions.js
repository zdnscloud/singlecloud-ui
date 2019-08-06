import * as c from './constants';

/*
  actions
*/
export const loadApplications = (url) => ({
  type: c.LOAD_APPLICATIONS,
  payload: url,
});

export const loadApplicationsSuccess = (resp, applicationID) => ({
  type: c.LOAD_APPLICATIONS_SUCCESS,
  payload: resp,
  meta: { applicationID },
});

export const loadApplicationsFailure = (error, applicationID) => ({
  type: c.LOAD_APPLICATIONS_FAILURE,
  payload: error,
  meta: { applicationID },
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


