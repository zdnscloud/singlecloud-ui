import * as c from './constants';

/*
  actions
*/
export const loadStorageClasses = (url, clusterID) => ({
  type: c.LOAD_STORAGECLASSES,
  payload: url,
  meta: { clusterID },
});

export const loadStorageClassesSuccess = (resp, clusterID) => ({
  type: c.LOAD_STORAGECLASSES_SUCCESS,
  payload: resp,
  meta: { clusterID },
});

export const loadStorageClassesFailure = (error, clusterID) => ({
  type: c.LOAD_STORAGECLASSES_FAILURE,
  payload: error,
  meta: { clusterID },
  error: true,
});

export const loadStorages = (url, clusterID) => ({
  type: c.LOAD_STORAGES,
  payload: url,
  meta: { clusterID },
});

export const loadStoragesSuccess = (resp, clusterID) => ({
  type: c.LOAD_STORAGES_SUCCESS,
  payload: resp,
  meta: { clusterID },
});

export const loadStoragesFailure = (error, clusterID) => ({
  type: c.LOAD_STORAGES_FAILURE,
  payload: error,
  meta: { clusterID },
  error: true,
});

export const loadNFSStorages = (url, clusterID) => ({
  type: c.LOAD_NFS_STORAGES,
  payload: url,
  meta: { clusterID },
});

export const loadNFSStoragesSuccess = (resp, clusterID) => ({
  type: c.LOAD_NFS_STORAGES_SUCCESS,
  payload: resp,
  meta: { clusterID },
});

export const loadNFSStoragesFailure = (error, clusterID) => ({
  type: c.LOAD_NFS_STORAGES_FAILURE,
  payload: error,
  meta: { clusterID },
  error: true,
});

export const loadLVMStorages = (url, clusterID) => ({
  type: c.LOAD_LVM_STORAGES,
  payload: url,
  meta: { clusterID },
});

export const loadLVMStoragesSuccess = (resp, clusterID) => ({
  type: c.LOAD_LVM_STORAGES_SUCCESS,
  payload: resp,
  meta: { clusterID },
});

export const loadLVMStoragesFailure = (error, clusterID) => ({
  type: c.LOAD_LVM_STORAGES_FAILURE,
  payload: error,
  meta: { clusterID },
  error: true,
});

export const loadBlockDevices = (url, clusterID) => ({
  type: c.LOAD_BLOCK_DEVICES,
  payload: url,
  meta: { clusterID },
});

export const loadBlockDevicesSuccess = (resp, clusterID) => ({
  type: c.LOAD_BLOCK_DEVICES_SUCCESS,
  payload: resp,
  meta: { clusterID },
});

export const loadBlockDevicesFailure = (error, clusterID) => ({
  type: c.LOAD_BLOCK_DEVICES_FAILURE,
  payload: error,
  meta: { clusterID },
  error: true,
});

export const createStorage = (data, meta) => ({
  type: c.CREATE_STORAGE,
  payload: data,
  meta,
});

export const createStorageSuccess = (resp, meta) => ({
  type: c.CREATE_STORAGE_SUCCESS,
  payload: resp,
  meta,
});

export const createStorageFailure = (error, meta) => ({
  type: c.CREATE_STORAGE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeStorage = (id, meta) => ({
  type: c.REMOVE_STORAGE,
  payload: id,
  meta,
});

export const removeStorageSuccess = (resp, meta) => ({
  type: c.REMOVE_STORAGE_SUCCESS,
  payload: resp,
  meta,
});

export const removeStorageFailure = (error, meta) => ({
  type: c.REMOVE_STORAGE_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const editStorage = (data, meta) => ({
  type: c.EDIT_STORAGE,
  payload: data,
  meta,
});

export const editStorageSuccess = (resp, meta) => ({
  type: c.EDIT_STORAGE_SUCCESS,
  payload: resp,
  meta,
});

export const editStorageFailure = (error, meta) => ({
  type: c.EDIT_STORAGE_FAILURE,
  payload: error,
  meta,
  error: true,
});
