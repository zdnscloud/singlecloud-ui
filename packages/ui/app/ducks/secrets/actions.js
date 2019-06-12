import * as c from './constants';

/*
  actions
*/
export const loadSecrets = (meta) => ({
  type: c.LOAD_SECRETS,
  payload: {},
  meta,
});

export const loadSecretsSuccess = (resp, meta) => ({
  type: c.LOAD_SECRETS_SUCCESS,
  payload: resp,
  meta,
});

export const loadSecretsFailure = (error, meta) => ({
  type: c.LOAD_SECRETS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const loadSecret = (id) => ({
  type: c.LOAD_SECRET,
  payload: id,
});

export const loadSecretSuccess = (resp) => ({
  type: c.LOAD_SECRET_SUCCESS,
  payload: resp,
});

export const loadSecretFailure = (error) => ({
  type: c.LOAD_SECRET_FAILURE,
  payload: error,
  error: true,
});

export const createSecret = (data, meta) => ({
  type: c.CREATE_SECRET,
  payload: data,
  meta,
});

export const createSecretSuccess = (resp, meta) => ({
  type: c.CREATE_SECRET_SUCCESS,
  payload: resp,
  meta,
});

export const createSecretFailure = (error, meta) => ({
  type: c.CREATE_SECRET_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateSecret = (data, meta) => ({
  type: c.UPDATE_SECRET,
  payload: data,
  meta,
});

export const updateSecretSuccess = (resp) => ({
  type: c.UPDATE_SECRET_SUCCESS,
  payload: resp,
});

export const updateSecretFailure = (error) => ({
  type: c.UPDATE_SECRET_FAILURE,
  payload: error,
  error: true,
});

export const removeSecret = (id, meta) => ({
  type: c.REMOVE_SECRET,
  payload: id,
  meta,
});

export const removeSecretSuccess = (resp, meta) => ({
  type: c.REMOVE_SECRET_SUCCESS,
  payload: resp,
  meta,
});

export const removeSecretFailure = (error, meta) => ({
  type: c.REMOVE_SECRET_FAILURE,
  payload: error,
  meta,
  error: true,
});