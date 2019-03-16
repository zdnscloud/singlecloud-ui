/*
 *
 * ServicesPage actions
 *
 */

import {
  INIT_ACTION,
  LOAD_SERVICES,
  LOAD_SERVICES_REQUEST,
  LOAD_SERVICES_SUCCESS,
  LOAD_SERVICES_FAILURE,
  LOAD_SERVICE,
  LOAD_SERVICE_REQUEST,
  LOAD_SERVICE_SUCCESS,
  LOAD_SERVICE_FAILURE,
  OPEN_CREATE_SERVICE,
  CLOSE_CREATE_SERVICE,
  CREATE_SERVICE,
  CREATE_SERVICE_REQUEST,
  CREATE_SERVICE_SUCCESS,
  CREATE_SERVICE_FAILURE,
  UPDATE_CREATE_FORM,
  REMOVE_SERVICE,
  REMOVE_SERVICE_REQUEST,
  REMOVE_SERVICE_SUCCESS,
  REMOVE_SERVICE_FAILURE,
} from './constants';

export function initAction({ params }) {
  return {
    type: INIT_ACTION,
    payload: { ...params },
  };
}

export const loadServices = () => ({
  type: LOAD_SERVICES,
  payload: {},
});

export const loadServicesRequest = () => ({
  type: LOAD_SERVICES_REQUEST,
  payload: {},
});

export const loadServicesSuccess = (clusterID, namespaceID, data) => ({
  type: LOAD_SERVICES_SUCCESS,
  payload: { clusterID, namespaceID, data },
});

export const loadServicesFailure = (errors) => ({
  type: LOAD_SERVICES_FAILURE,
  payload: { errors },
});

export const loadService = (id) => ({
  type: LOAD_SERVICE,
  payload: { id },
});

export const loadServiceRequest = () => ({
  type: LOAD_SERVICE_REQUEST,
  payload: {},
});

export const loadServiceSuccess = (data) => ({
  type: LOAD_SERVICE_SUCCESS,
  payload: { data },
});

export const loadServiceFailure = (errors) => ({
  type: LOAD_SERVICE_FAILURE,
  payload: { errors },
});

export const openCreateService = () => ({
  type: OPEN_CREATE_SERVICE,
  payload: {},
});

export const closeCreateService = () => ({
  type: CLOSE_CREATE_SERVICE,
  payload: {},
});

export const createService = () => ({
  type: CREATE_SERVICE,
  payload: {},
});

export const createServiceRequest = () => ({
  type: CREATE_SERVICE_REQUEST,
  payload: {},
});

export const createServiceSuccess = (clusterID, data) => ({
  type: CREATE_SERVICE_SUCCESS,
  payload: { clusterID, data },
});

export const createServiceFailure = (errors) => ({
  type: CREATE_SERVICE_FAILURE,
  payload: { errors },
});

export const updateCreateForm = (name, value) => ({
  type: UPDATE_CREATE_FORM,
  payload: { name, value },
});

export const removeService = (id) => ({
  type: REMOVE_SERVICE,
  payload: { id },
});

export const removeServiceRequest = () => ({
  type: REMOVE_SERVICE_REQUEST,
  payload: {},
});

export const removeServiceSuccess = (clusterID, id) => ({
  type: REMOVE_SERVICE_SUCCESS,
  payload: { clusterID, id },
});

export const removeServiceFailure = (errors) => ({
  type: REMOVE_SERVICE_FAILURE,
  payload: { errors },
});
