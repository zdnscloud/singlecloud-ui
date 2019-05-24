import * as c from './constants';

/*
  actions
*/
export const loadStatefulSets = (meta) => ({
  type: c.LOAD_STATEFULSETS,
  payload: {},
  meta,
});

export const loadStatefulSetsSuccess = (resp, meta) => ({
  type: c.LOAD_STATEFULSETS_SUCCESS,
  payload: resp,
  meta,
});

export const loadStatefulSetsFailure = (error, meta) => ({
  type: c.LOAD_STATEFULSETS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const loadStatefulSet = (id, meta) => ({
  type: c.LOAD_STATEFULSET,
  payload: id,
  meta,
});

export const loadStatefulSetSuccess = (resp, meta) => ({
  type: c.LOAD_STATEFULSET_SUCCESS,
  payload: resp,
  meta,
});

export const loadStatefulSetFailure = (error, meta) => ({
  type: c.LOAD_STATEFULSET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createStatefulSet = (data, meta) => ({
  type: c.CREATE_STATEFULSET,
  payload: data,
  meta,
});

export const createStatefulSetSuccess = (resp, meta) => ({
  type: c.CREATE_STATEFULSET_SUCCESS,
  payload: resp,
  meta,
});

export const createStatefulSetFailure = (error, meta) => ({
  type: c.CREATE_STATEFULSET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateStatefulSet = (data, meta) => ({
  type: c.UPDATE_STATEFULSET,
  payload: data,
  meta,
});

export const updateStatefulSetSuccess = (resp) => ({
  type: c.UPDATE_STATEFULSET_SUCCESS,
  payload: resp,
});

export const updateStatefulSetFailure = (error) => ({
  type: c.UPDATE_STATEFULSET_FAILURE,
  payload: error,
  error: true,
});

export const removeStatefulSet = (id, meta) => ({
  type: c.REMOVE_STATEFULSET,
  payload: id,
  meta,
});

export const removeStatefulSetSuccess = (resp, meta) => ({
  type: c.REMOVE_STATEFULSET_SUCCESS,
  payload: resp,
  meta,
});

export const removeStatefulSetFailure = (error, meta) => ({
  type: c.REMOVE_STATEFULSET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const scaleStatefulSet = (scale, meta) => ({
  type: c.SCALE_STATEFULSET,
  payload: scale,
  meta,
});

export const scaleStatefulSetSuccess = (resp, meta) => ({
  type: c.SCALE_STATEFULSET_SUCCESS,
  payload: resp,
  meta,
});

export const scaleStatefulSetFailure = (error, meta) => ({
  type: c.SCALE_STATEFULSET_FAILURE,
  payload: error,
  meta,
  error: true,
});
