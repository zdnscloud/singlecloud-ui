/*
 *
 * ClusterDetailPage actions
 *
 */

import {
  INIT_ACTION,
  LOAD_CLUSTER,
  LOAD_CLUSTER_REQUEST,
  LOAD_CLUSTER_SUCCESS,
  LOAD_CLUSTER_FAILURE,
} from './constants';

export function initAction() {
  return {
    type: INIT_ACTION,
  };
}

export const loadClusterDetail = (id) => ({
  type: LOAD_CLUSTER,
  payload: { id },
});

export const loadClusterDetailRequest = () => ({
  type: LOAD_CLUSTER_REQUEST,
  payload: {},
});

export const loadClusterDetailSuccess = (data) => ({
  type: LOAD_CLUSTER_SUCCESS,
  payload: { data },
});

export const loadClusterDetailFailure = (errors) => ({
  type: LOAD_CLUSTER_FAILURE,
  payload: { errors },
});
