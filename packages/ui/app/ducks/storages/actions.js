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
