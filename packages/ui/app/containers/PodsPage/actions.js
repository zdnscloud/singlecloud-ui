/*
 *
 * PodsPage actions
 *
 */

import {
  INIT_ACTION,
  LOAD_PODS,
  LOAD_PODS_REQUEST,
  LOAD_PODS_SUCCESS,
  LOAD_PODS_FAILURE,
  INIT_CREATE_FORM,
  CREATE_POD,
  CREATE_POD_REQUEST,
  CREATE_POD_SUCCESS,
  CREATE_POD_FAILURE,
  UPDATE_CREATE_FORM,
  REMOVE_POD,
  REMOVE_POD_REQUEST,
  REMOVE_POD_SUCCESS,
  REMOVE_POD_FAILURE,
  OPEN_LOG_VIEW,
  CLOSE_LOG_VIEW,
  ADD_LOG,
  SET_LOGS,
} from './constants';

export function initAction({ params }) {
  return {
    type: INIT_ACTION,
    payload: { ...params },
  };
}

export const loadPods = () => ({
  type: LOAD_PODS,
  payload: {},
});

export const loadPodsRequest = () => ({
  type: LOAD_PODS_REQUEST,
  payload: {},
});

export const loadPodsSuccess = (
  clusterID,
  namespaceID,
  deploymentID,
  data
) => ({
  type: LOAD_PODS_SUCCESS,
  payload: {
    clusterID,
    namespaceID,
    deploymentID,
    data,
  },
});

export const loadPodsFailure = (errors) => ({
  type: LOAD_PODS_FAILURE,
  payload: { errors },
});

export const initCreateForm = ({ params }) => ({
  type: INIT_CREATE_FORM,
  payload: { ...params },
});

export const createPod = () => ({
  type: CREATE_POD,
  payload: {},
});

export const createPodRequest = () => ({
  type: CREATE_POD_REQUEST,
  payload: {},
});

export const createPodSuccess = (data) => ({
  type: CREATE_POD_SUCCESS,
  payload: { data },
});

export const createPodFailure = (errors) => ({
  type: CREATE_POD_FAILURE,
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

export const removePod = (id) => ({
  type: REMOVE_POD,
  payload: { id },
});

export const removePodRequest = () => ({
  type: REMOVE_POD_REQUEST,
  payload: {},
});

export const removePodSuccess = (clusterID, id) => ({
  type: REMOVE_POD_SUCCESS,
  payload: { clusterID, id },
});

export const removePodFailure = (errors) => ({
  type: REMOVE_POD_FAILURE,
  payload: { errors },
});

export const openLogView = (podID, name) => ({
  type: OPEN_LOG_VIEW,
  payload: { podID, name },
});

export const closeLogView = () => ({
  type: CLOSE_LOG_VIEW,
  payload: {},
});

export const addLog = (log) => ({
  type: ADD_LOG,
  payload: { log },
});

export const setLogs = (logs) => ({
  type: SET_LOGS,
  payload: { logs },
});
