/**
 * Duck: StatefulSets
 * actions: statefulSets
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadStatefulSets = (url, meta = {}) => ({
  type: c.LOAD_STATEFUL_SETS,
  payload: url,
  meta,
});

export const loadStatefulSetsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_STATEFUL_SETS_SUCCESS,
  payload: resp,
  meta,
});

export const loadStatefulSetsFailure = (error, meta = {}) => ({
  type: c.LOAD_STATEFUL_SETS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createStatefulSet = (data, meta = {}) => ({
  type: c.CREATE_STATEFUL_SET,
  payload: data,
  meta,
});

export const createStatefulSetSuccess = (resp, meta = {}) => ({
  type: c.CREATE_STATEFUL_SET_SUCCESS,
  payload: resp,
  meta,
});

export const createStatefulSetFailure = (error, meta = {}) => ({
  type: c.CREATE_STATEFUL_SET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateStatefulSet = (data, meta = {}) => ({
  type: c.UPDATE_STATEFUL_SET,
  payload: data,
  meta,
});

export const updateStatefulSetSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_STATEFUL_SET_SUCCESS,
  payload: resp,
  meta,
});

export const updateStatefulSetFailure = (error, meta = {}) => ({
  type: c.UPDATE_STATEFUL_SET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readStatefulSet = (id, meta = {}) => ({
  type: c.READ_STATEFUL_SET,
  payload: id,
  meta,
});

export const readStatefulSetSuccess = (resp, meta = {}) => ({
  type: c.READ_STATEFUL_SET_SUCCESS,
  payload: resp,
  meta,
});

export const readStatefulSetFailure = (error, meta = {}) => ({
  type: c.READ_STATEFUL_SET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeStatefulSet = (id, meta = {}) => ({
  type: c.REMOVE_STATEFUL_SET,
  payload: id,
  meta,
});

export const removeStatefulSetSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_STATEFUL_SET_SUCCESS,
  payload: resp,
  meta,
});

export const removeStatefulSetFailure = (error, meta = {}) => ({
  type: c.REMOVE_STATEFUL_SET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const executeStatefulSetAction = (action, data, meta = {}) => ({
  type: c.EXECUTE_STATEFUL_SET_ACTION,
  payload: {
    action,
    data,
  },
  meta,
});

export const executeStatefulSetActionSuccess = (resp, meta = {}) => ({
  type: c.EXECUTE_STATEFUL_SET_ACTION_SUCCESS,
  payload: resp,
  meta,
});

export const executeStatefulSetActionFailure = (error, meta = {}) => ({
  type: c.EXECUTE_STATEFUL_SET_ACTION_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
