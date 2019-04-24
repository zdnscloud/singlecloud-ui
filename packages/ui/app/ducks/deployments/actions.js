import * as c from './constants';

/*
  actions
*/
export const loadDeployments = (meta) => ({
  type: c.LOAD_DEPLOYMENTS,
  payload: {},
  meta,
});

export const loadDeploymentsSuccess = (resp, meta) => ({
  type: c.LOAD_DEPLOYMENTS_SUCCESS,
  payload: resp,
  meta,
});

export const loadDeploymentsFailure = (error, meta) => ({
  type: c.LOAD_DEPLOYMENTS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const loadDeployment = (id) => ({
  type: c.LOAD_DEPLOYMENT,
  payload: id,
});

export const loadDeploymentSuccess = (resp) => ({
  type: c.LOAD_DEPLOYMENT_SUCCESS,
  payload: resp,
});

export const loadDeploymentFailure = (error) => ({
  type: c.LOAD_DEPLOYMENT_FAILURE,
  payload: error,
  error: true,
});

export const createDeployment = (data, meta) => ({
  type: c.CREATE_DEPLOYMENT,
  payload: data,
  meta,
});

export const createDeploymentSuccess = (resp, meta) => ({
  type: c.CREATE_DEPLOYMENT_SUCCESS,
  payload: resp,
  meta,
});

export const createDeploymentFailure = (error, meta) => ({
  type: c.CREATE_DEPLOYMENT_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateDeployment = (data, meta) => ({
  type: c.UPDATE_DEPLOYMENT,
  payload: data,
  meta,
});

export const updateDeploymentSuccess = (resp) => ({
  type: c.UPDATE_DEPLOYMENT_SUCCESS,
  payload: resp,
});

export const updateDeploymentFailure = (error) => ({
  type: c.UPDATE_DEPLOYMENT_FAILURE,
  payload: error,
  error: true,
});

export const removeDeployment = (id, meta) => ({
  type: c.REMOVE_DEPLOYMENT,
  payload: id,
  meta,
});

export const removeDeploymentSuccess = (resp, meta) => ({
  type: c.REMOVE_DEPLOYMENT_SUCCESS,
  payload: resp,
  meta,
});

export const removeDeploymentFailure = (error, meta) => ({
  type: c.REMOVE_DEPLOYMENT_FAILURE,
  payload: error,
  meta,
  error: true,
});
