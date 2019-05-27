/*
 *
 * ClustersPage actions
 *
 */

import {
  INIT_ACTION,
  UNMOUNT_ACTION,
  LOAD_CLUSTERS,
  LOAD_CLUSTERS_REQUEST,
  LOAD_CLUSTERS_SUCCESS,
  LOAD_CLUSTERS_FAILURE,
  LOAD_CLUSTER,
  LOAD_CLUSTER_REQUEST,
  LOAD_CLUSTER_SUCCESS,
  LOAD_CLUSTER_FAILURE,
  REMOVE_CLUSTER,
  REMOVE_CLUSTER_REQUEST,
  REMOVE_CLUSTER_SUCCESS,
  REMOVE_CLUSTER_FAILURE,
} from './constants';

export function initAction() {
  return {
    type: INIT_ACTION,
  };
}

export function unmountAction() {
  return {
    type: UNMOUNT_ACTION,
  };
}

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

export const loadCluster = (id) => ({
  type: LOAD_CLUSTER,
  payload: { id },
});

export const loadClusterRequest = () => ({
  type: LOAD_CLUSTER_REQUEST,
  payload: {},
});

export const loadClusterSuccess = (data) => ({
  type: LOAD_CLUSTER_SUCCESS,
  payload: { data },
});

export const loadClusterFailure = (errors) => ({
  type: LOAD_CLUSTER_FAILURE,
  payload: { errors },
});

export const removeCluster = (id) => ({
  type: REMOVE_CLUSTER,
  payload: id,
});
export const removeClusterRequest = () => ({
  type: REMOVE_CLUSTER_REQUEST,
  payload: {},
});
export const removeClusterSuccess = () => ({
  type: REMOVE_CLUSTER_SUCCESS,
  payload: {},
});
export const removeClusterFailure = () => ({
  type: REMOVE_CLUSTER_FAILURE,
  payload: {},
});
