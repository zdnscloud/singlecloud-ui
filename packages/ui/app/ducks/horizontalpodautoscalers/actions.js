/**
 * Duck: HorizontalPodAutoscalers
 * actions: horizontalPodAutoscalers
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadHorizontalPodAutoscalers = (url, meta = {}) => ({
  type: c.LOAD_HORIZONTAL_POD_AUTOSCALERS,
  payload: url,
  meta,
});

export const loadHorizontalPodAutoscalersSuccess = (resp, meta = {}) => ({
  type: c.LOAD_HORIZONTAL_POD_AUTOSCALERS_SUCCESS,
  payload: resp,
  meta,
});

export const loadHorizontalPodAutoscalersFailure = (error, meta = {}) => ({
  type: c.LOAD_HORIZONTAL_POD_AUTOSCALERS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createHorizontalPodAutoscaler = (data, meta = {}) => ({
  type: c.CREATE_HORIZONTAL_POD_AUTOSCALER,
  payload: data,
  meta,
});

export const createHorizontalPodAutoscalerSuccess = (resp, meta = {}) => ({
  type: c.CREATE_HORIZONTAL_POD_AUTOSCALER_SUCCESS,
  payload: resp,
  meta,
});

export const createHorizontalPodAutoscalerFailure = (error, meta = {}) => ({
  type: c.CREATE_HORIZONTAL_POD_AUTOSCALER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateHorizontalPodAutoscaler = (data, meta = {}) => ({
  type: c.UPDATE_HORIZONTAL_POD_AUTOSCALER,
  payload: data,
  meta,
});

export const updateHorizontalPodAutoscalerSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_HORIZONTAL_POD_AUTOSCALER_SUCCESS,
  payload: resp,
  meta,
});

export const updateHorizontalPodAutoscalerFailure = (error, meta = {}) => ({
  type: c.UPDATE_HORIZONTAL_POD_AUTOSCALER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readHorizontalPodAutoscaler = (id, meta = {}) => ({
  type: c.READ_HORIZONTAL_POD_AUTOSCALER,
  payload: id,
  meta,
});

export const readHorizontalPodAutoscalerSuccess = (resp, meta = {}) => ({
  type: c.READ_HORIZONTAL_POD_AUTOSCALER_SUCCESS,
  payload: resp,
  meta,
});

export const readHorizontalPodAutoscalerFailure = (error, meta = {}) => ({
  type: c.READ_HORIZONTAL_POD_AUTOSCALER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeHorizontalPodAutoscaler = (id, meta = {}) => ({
  type: c.REMOVE_HORIZONTAL_POD_AUTOSCALER,
  payload: id,
  meta,
});

export const removeHorizontalPodAutoscalerSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_HORIZONTAL_POD_AUTOSCALER_SUCCESS,
  payload: resp,
  meta,
});

export const removeHorizontalPodAutoscalerFailure = (error, meta = {}) => ({
  type: c.REMOVE_HORIZONTAL_POD_AUTOSCALER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
