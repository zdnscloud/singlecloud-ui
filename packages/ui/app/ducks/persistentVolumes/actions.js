/**
 * Duck: PersistentVolumes
 * actions: persistentVolumes
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadPersistentVolumes = (url, meta = {}) => ({
  type: c.LOAD_PERSISTENT_VOLUMES,
  payload: url,
  meta,
});

export const loadPersistentVolumesSuccess = (resp, meta = {}) => ({
  type: c.LOAD_PERSISTENT_VOLUMES_SUCCESS,
  payload: resp,
  meta,
});

export const loadPersistentVolumesFailure = (error, meta = {}) => ({
  type: c.LOAD_PERSISTENT_VOLUMES_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readPersistentVolume = (id, meta = {}) => ({
  type: c.READ_PERSISTENT_VOLUME,
  payload: id,
  meta,
});

export const readPersistentVolumeSuccess = (resp, meta = {}) => ({
  type: c.READ_PERSISTENT_VOLUME_SUCCESS,
  payload: resp,
  meta,
});

export const readPersistentVolumeFailure = (error, meta = {}) => ({
  type: c.READ_PERSISTENT_VOLUME_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removePersistentVolume = (id, meta = {}) => ({
  type: c.REMOVE_PERSISTENT_VOLUME,
  payload: id,
  meta,
});

export const removePersistentVolumeSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_PERSISTENT_VOLUME_SUCCESS,
  payload: resp,
  meta,
});

export const removePersistentVolumeFailure = (error, meta = {}) => ({
  type: c.REMOVE_PERSISTENT_VOLUME_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
