/*
 *
 * ClustersPage actions
 *
 */

import {
  INIT_ACTION,
  OPEN_CREATE_CLUSTER,
  CLOSE_CREATE_CLUSTER,
  LOAD_CLUSTERS,
  LOAD_CLUSTERS_REQUEST,
  LOAD_CLUSTERS_SUCCESS,
  LOAD_CLUSTERS_FAILURE,
  CREATE_CLUSTER,
  CREATE_CLUSTER_REQUEST,
  CREATE_CLUSTER_SUCCESS,
  CREATE_CLUSTER_FAILURE,
  UPDATE_CREATE_FORM,
} from './constants';

export function initAction() {
  return {
    type: INIT_ACTION,
  };
}

export const openCreateCluster = () => ({
  type: OPEN_CREATE_CLUSTER,
  payload: {},
});

export const closeCreateCluster = () => ({
  type: CLOSE_CREATE_CLUSTER,
  payload: {},
});

export const loadClusters = () => ({
  type: LOAD_CLUSTERS,
  payload: {},
});

export const loadClustersRequest = () => ({
  type: LOAD_CLUSTERS_REQUEST,
  payload: {},
});

export const loadClustersSuccess = (data) => ({
  type: LOAD_CLUSTERS_SUCCESS,
  payload: { data },
});

export const loadClustersFailure = (errors) => ({
  type: LOAD_CLUSTERS_FAILURE,
  payload: { errors },
});

export const createCluster = () => ({
  type: CREATE_CLUSTER,
  payload: {},
});

export const createClusterRequest = () => ({
  type: CREATE_CLUSTER_REQUEST,
  payload: {},
});

export const createClusterSuccess = (data) => ({
  type: CREATE_CLUSTER_SUCCESS,
  payload: { data },
});

export const createClusterFailure = (errors) => ({
  type: CREATE_CLUSTER_FAILURE,
  payload: { errors },
});

export const updateCreateForm = (name, value) => ({
  type: UPDATE_CREATE_FORM,
  payload: { name, value },
});
