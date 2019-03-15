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
} from './constants';

export function initAction({ params }) {
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

export const loadNodesSuccess = (clusterID, data) => ({
  type: LOAD_NODES_SUCCESS,
  payload: { clusterID, data },
});

export const loadNodesFailure = (errors) => ({
  type: LOAD_NODES_FAILURE,
  payload: { errors },
});
