/**
 * Duck: Secrets
 * actions: secrets
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadSecrets = (url, meta = {}) => ({
  type: c.LOAD_SECRETS,
  payload: url,
  meta,
});

export const loadSecretsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_SECRETS_SUCCESS,
  payload: resp,
  meta,
});

export const loadSecretsFailure = (error, meta = {}) => ({
  type: c.LOAD_SECRETS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createSecret = (data, meta = {}) => ({
  type: c.CREATE_SECRET,
  payload: data,
  meta,
});

export const createSecretSuccess = (resp, meta = {}) => ({
  type: c.CREATE_SECRET_SUCCESS,
  payload: resp,
  meta,
});

export const createSecretFailure = (error, meta = {}) => ({
  type: c.CREATE_SECRET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateSecret = (data, meta = {}) => ({
  type: c.UPDATE_SECRET,
  payload: data,
  meta,
});

export const updateSecretSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_SECRET_SUCCESS,
  payload: resp,
  meta,
});

export const updateSecretFailure = (error, meta = {}) => ({
  type: c.UPDATE_SECRET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readSecret = (id, meta = {}) => ({
  type: c.READ_SECRET,
  payload: id,
  meta,
});

export const readSecretSuccess = (resp, meta = {}) => ({
  type: c.READ_SECRET_SUCCESS,
  payload: resp,
  meta,
});

export const readSecretFailure = (error, meta = {}) => ({
  type: c.READ_SECRET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeSecret = (id, meta = {}) => ({
  type: c.REMOVE_SECRET,
  payload: id,
  meta,
});

export const removeSecretSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_SECRET_SUCCESS,
  payload: resp,
  meta,
});

export const removeSecretFailure = (error, meta = {}) => ({
  type: c.REMOVE_SECRET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
