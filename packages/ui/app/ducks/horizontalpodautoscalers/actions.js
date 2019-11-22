/**
 * Duck: Horizontalpodautoscalers
 * actions: horizontalpodautoscalers
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadHorizontalpodautoscalers = (url, meta = {}) => ({
  type: c.LOAD_HORIZONTALPODAUTOSCALERS,
  payload: url,
  meta,
});

export const loadHorizontalpodautoscalersSuccess = (resp, meta = {}) => ({
  type: c.LOAD_HORIZONTALPODAUTOSCALERS_SUCCESS,
  payload: resp,
  meta,
});

export const loadHorizontalpodautoscalersFailure = (error, meta = {}) => ({
  type: c.LOAD_HORIZONTALPODAUTOSCALERS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createHorizontalpodautoscaler = (data, meta = {}) => ({
  type: c.CREATE_HORIZONTALPODAUTOSCALER,
  payload: data,
  meta,
});

export const createHorizontalpodautoscalerSuccess = (resp, meta = {}) => ({
  type: c.CREATE_HORIZONTALPODAUTOSCALER_SUCCESS,
  payload: resp,
  meta,
});

export const createHorizontalpodautoscalerFailure = (error, meta = {}) => ({
  type: c.CREATE_HORIZONTALPODAUTOSCALER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateHorizontalpodautoscaler = (data, meta = {}) => ({
  type: c.UPDATE_HORIZONTALPODAUTOSCALER,
  payload: data,
  meta,
});

export const updateHorizontalpodautoscalerSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_HORIZONTALPODAUTOSCALER_SUCCESS,
  payload: resp,
  meta,
});

export const updateHorizontalpodautoscalerFailure = (error, meta = {}) => ({
  type: c.UPDATE_HORIZONTALPODAUTOSCALER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readHorizontalpodautoscaler = (id, meta = {}) => ({
  type: c.READ_HORIZONTALPODAUTOSCALER,
  payload: id,
  meta,
});

export const readHorizontalpodautoscalerSuccess = (resp, meta = {}) => ({
  type: c.READ_HORIZONTALPODAUTOSCALER_SUCCESS,
  payload: resp,
  meta,
});

export const readHorizontalpodautoscalerFailure = (error, meta = {}) => ({
  type: c.READ_HORIZONTALPODAUTOSCALER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeHorizontalpodautoscaler = (id, meta = {}) => ({
  type: c.REMOVE_HORIZONTALPODAUTOSCALER,
  payload: id,
  meta,
});

export const removeHorizontalpodautoscalerSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_HORIZONTALPODAUTOSCALER_SUCCESS,
  payload: resp,
  meta,
});

export const removeHorizontalpodautoscalerFailure = (error, meta = {}) => ({
  type: c.REMOVE_HORIZONTALPODAUTOSCALER_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
