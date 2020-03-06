/**
 * Duck: KubeConfigs
 * actions: kubeConfigs
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadKubeConfigs = (url, meta = {}) => ({
  type: c.LOAD_KUBE_CONFIGS,
  payload: url,
  meta,
});

export const loadKubeConfigsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_KUBE_CONFIGS_SUCCESS,
  payload: resp,
  meta,
});

export const loadKubeConfigsFailure = (error, meta = {}) => ({
  type: c.LOAD_KUBE_CONFIGS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readKubeConfig = (id, meta = {}) => ({
  type: c.READ_KUBE_CONFIG,
  payload: id,
  meta,
});

export const readKubeConfigSuccess = (resp, meta = {}) => ({
  type: c.READ_KUBE_CONFIG_SUCCESS,
  payload: resp,
  meta,
});

export const readKubeConfigFailure = (error, meta = {}) => ({
  type: c.READ_KUBE_CONFIG_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
