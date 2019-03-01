/*
 *
 * NodesPage actions
 *
 */

import {
  INIT_ACTION,
  LOAD_NODES,
  LOAD_NODES_REQUEST,
  LOAD_NODES_SUCCESS,
  LOAD_NODES_FAILURE,
  LOAD_CLUSTER,
  LOAD_CLUSTER_REQUEST,
  LOAD_CLUSTER_SUCCESS,
  LOAD_CLUSTER_FAILURE,
  UPDATE_CREATE_FORM,
} from './constants';

export function initAction(params) {
  return {
    type: INIT_ACTION,
    payload: { ...params },
  };
}

export const loadNodes = () => ({
  type: LOAD_NODES,
  payload: {},
});

export const loadNodesRequest = () => ({
  type: LOAD_NODES_REQUEST,
  payload: {},
});

export const loadNodesSuccess = data => ({
  type: LOAD_NODES_SUCCESS,
  payload: { data },
});

export const loadNodesFailure = errors => ({
  type: LOAD_NODES_FAILURE,
  payload: { errors },
});

export const loadCluster = () => ({
  type: LOAD_CLUSTER,
  payload: {},
});

export const loadClusterRequest = () => ({
  type: LOAD_CLUSTER_REQUEST,
  payload: {},
});

export const loadClusterSuccess = data => ({
  type: LOAD_CLUSTER_SUCCESS,
  payload: { data },
});

export const loadClusterFailure = errors => ({
  type: LOAD_CLUSTER_FAILURE,
  payload: { errors },
});

export const updateCreateForm = (name, value) => ({
  type: UPDATE_CREATE_FORM,
  payload: { name, value },
});
