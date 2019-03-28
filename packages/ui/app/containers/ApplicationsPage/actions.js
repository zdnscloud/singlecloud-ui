/*
 *
 * ApplicationsPage actions
 *
 */

import {
  INIT_ACTION,
  LOAD_APPLICATIONS,
  LOAD_APPLICATIONS_REQUEST,
  LOAD_APPLICATIONS_SUCCESS,
  LOAD_APPLICATIONS_FAILURE,
  INIT_CREATE_FORM,
  CREATE_APPLICATION,
  CREATE_APPLICATION_REQUEST,
  CREATE_APPLICATION_SUCCESS,
  CREATE_APPLICATION_FAILURE,
  UPDATE_CREATE_FORM,
  REMOVE_APPLICATION,
  REMOVE_APPLICATION_REQUEST,
  REMOVE_APPLICATION_SUCCESS,
  REMOVE_APPLICATION_FAILURE,
  CHANGE_NAMESPACE,
} from './constants';

export function initAction({ params }) {
  return {
    type: INIT_ACTION,
    payload: { ...params },
  };
}

export const loadApplications = () => ({
  type: LOAD_APPLICATIONS,
  payload: {},
});

export const loadApplicationsRequest = () => ({
  type: LOAD_APPLICATIONS_REQUEST,
  payload: {},
});

export const loadApplicationsSuccess = (clusterID, namespaceID, data) => ({
  type: LOAD_APPLICATIONS_SUCCESS,
  payload: {
    clusterID,
    namespaceID,
    data,
  },
});

export const loadApplicationsFailure = (errors) => ({
  type: LOAD_APPLICATIONS_FAILURE,
  payload: { errors },
});

export const initCreateForm = ({ params }) => ({
  type: INIT_CREATE_FORM,
  payload: { ...params },
});

export const createApplication = () => ({
  type: CREATE_APPLICATION,
  payload: {},
});

export const createApplicationRequest = () => ({
  type: CREATE_APPLICATION_REQUEST,
  payload: {},
});

export const createApplicationSuccess = (data) => ({
  type: CREATE_APPLICATION_SUCCESS,
  payload: { data },
});

export const createApplicationFailure = (errors) => ({
  type: CREATE_APPLICATION_FAILURE,
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

export const removeApplication = (id) => ({
  type: REMOVE_APPLICATION,
  payload: { id },
});

export const removeApplicationRequest = () => ({
  type: REMOVE_APPLICATION_REQUEST,
  payload: {},
});

export const removeApplicationSuccess = (clusterID, id) => ({
  type: REMOVE_APPLICATION_SUCCESS,
  payload: { clusterID, id },
});

export const removeApplicationFailure = (errors) => ({
  type: REMOVE_APPLICATION_FAILURE,
  payload: { errors },
});

export const changeNamespace = (namespaceID) => ({
  type: CHANGE_NAMESPACE,
  payload: { namespaceID },
});
