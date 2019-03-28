/*
 *
 * DeploymentsPage actions
 *
 */

import {
  INIT_ACTION,
  LOAD_DEPLOYMENTS,
  LOAD_DEPLOYMENTS_REQUEST,
  LOAD_DEPLOYMENTS_SUCCESS,
  LOAD_DEPLOYMENTS_FAILURE,
  INIT_CREATE_FORM,
  CREATE_DEPLOYMENT,
  CREATE_DEPLOYMENT_REQUEST,
  CREATE_DEPLOYMENT_SUCCESS,
  CREATE_DEPLOYMENT_FAILURE,
  UPDATE_CREATE_FORM,
  REMOVE_DEPLOYMENT,
  REMOVE_DEPLOYMENT_REQUEST,
  REMOVE_DEPLOYMENT_SUCCESS,
  REMOVE_DEPLOYMENT_FAILURE,
} from './constants';

export function initAction({ params }) {
  return {
    type: INIT_ACTION,
    payload: { ...params },
  };
}

export const loadDeployments = () => ({
  type: LOAD_DEPLOYMENTS,
  payload: {},
});

export const loadDeploymentsRequest = () => ({
  type: LOAD_DEPLOYMENTS_REQUEST,
  payload: {},
});

export const loadDeploymentsSuccess = (clusterID, namespaceID, data) => ({
  type: LOAD_DEPLOYMENTS_SUCCESS,
  payload: {
    clusterID,
    namespaceID,
    data,
  },
});

export const loadDeploymentsFailure = (errors) => ({
  type: LOAD_DEPLOYMENTS_FAILURE,
  payload: { errors },
});

export const initCreateForm = ({ params }) => ({
  type: INIT_CREATE_FORM,
  payload: { ...params },
});

export const createDeployment = () => ({
  type: CREATE_DEPLOYMENT,
  payload: {},
});

export const createDeploymentRequest = () => ({
  type: CREATE_DEPLOYMENT_REQUEST,
  payload: {},
});

export const createDeploymentSuccess = (data) => ({
  type: CREATE_DEPLOYMENT_SUCCESS,
  payload: { data },
});

export const createDeploymentFailure = (errors) => ({
  type: CREATE_DEPLOYMENT_FAILURE,
  payload: { errors },
});

export function updateForm(name, value) {
  return {
    type: UPDATE_CREATE_FORM,
    payload: {
      name,
      value,
    },
  };
}

export const removeDeployment = (id) => ({
  type: REMOVE_DEPLOYMENT,
  payload: { id },
});

export const removeDeploymentRequest = () => ({
  type: REMOVE_DEPLOYMENT_REQUEST,
  payload: {},
});

export const removeDeploymentSuccess = (clusterID, id) => ({
  type: REMOVE_DEPLOYMENT_SUCCESS,
  payload: { clusterID, id },
});

export const removeDeploymentFailure = (errors) => ({
  type: REMOVE_DEPLOYMENT_FAILURE,
  payload: { errors },
});
