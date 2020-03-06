/**
 * Duck: PersistentVolumeClaims
 * actions: persistentVolumeClaims
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadPersistentVolumeClaims = (url, meta = {}) => ({
  type: c.LOAD_PERSISTENT_VOLUME_CLAIMS,
  payload: url,
  meta,
});

export const loadPersistentVolumeClaimsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_PERSISTENT_VOLUME_CLAIMS_SUCCESS,
  payload: resp,
  meta,
});

export const loadPersistentVolumeClaimsFailure = (error, meta = {}) => ({
  type: c.LOAD_PERSISTENT_VOLUME_CLAIMS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removePersistentVolumeClaim = (id, meta = {}) => ({
  type: c.REMOVE_PERSISTENT_VOLUME_CLAIM,
  payload: id,
  meta,
});

export const removePersistentVolumeClaimSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_PERSISTENT_VOLUME_CLAIM_SUCCESS,
  payload: resp,
  meta,
});

export const removePersistentVolumeClaimFailure = (error, meta = {}) => ({
  type: c.REMOVE_PERSISTENT_VOLUME_CLAIM_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
