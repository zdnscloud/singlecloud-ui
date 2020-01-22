/**
 * Duck: Deployments
 * actions: deployments
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadDeployments = (url, meta = {}) => ({
  type: c.LOAD_DEPLOYMENTS,
  payload: url,
  meta,
});

export const loadDeploymentsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_DEPLOYMENTS_SUCCESS,
  payload: resp,
  meta,
});

export const loadDeploymentsFailure = (error, meta = {}) => ({
  type: c.LOAD_DEPLOYMENTS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createDeployment = (data, meta = {}) => ({
  type: c.CREATE_DEPLOYMENT,
  payload: data,
  meta,
});

export const createDeploymentSuccess = (resp, meta = {}) => ({
  type: c.CREATE_DEPLOYMENT_SUCCESS,
  payload: resp,
  meta,
});

export const createDeploymentFailure = (error, meta = {}) => ({
  type: c.CREATE_DEPLOYMENT_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateDeployment = (data, meta = {}) => ({
  type: c.UPDATE_DEPLOYMENT,
  payload: data,
  meta,
});

export const updateDeploymentSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_DEPLOYMENT_SUCCESS,
  payload: resp,
  meta,
});

export const updateDeploymentFailure = (error, meta = {}) => ({
  type: c.UPDATE_DEPLOYMENT_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readDeployment = (id, meta = {}) => ({
  type: c.READ_DEPLOYMENT,
  payload: id,
  meta,
});

export const readDeploymentSuccess = (resp, meta = {}) => ({
  type: c.READ_DEPLOYMENT_SUCCESS,
  payload: resp,
  meta,
});

export const readDeploymentFailure = (error, meta = {}) => ({
  type: c.READ_DEPLOYMENT_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeDeployment = (id, meta = {}) => ({
  type: c.REMOVE_DEPLOYMENT,
  payload: id,
  meta,
});

export const removeDeploymentSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_DEPLOYMENT_SUCCESS,
  payload: resp,
  meta,
});

export const removeDeploymentFailure = (error, meta = {}) => ({
  type: c.REMOVE_DEPLOYMENT_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const executeDeploymentAction = (action, data, meta = {}) => ({
  type: c.EXECUTE_DEPLOYMENT_ACTION,
  payload: {
    action,
    data,
  },
  meta,
});

export const executeDeploymentActionSuccess = (resp, meta = {}) => ({
  type: c.EXECUTE_DEPLOYMENT_ACTION_SUCCESS,
  payload: resp,
  meta,
});

export const executeDeploymentActionFailure = (error, meta = {}) => ({
  type: c.EXECUTE_DEPLOYMENT_ACTION_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
