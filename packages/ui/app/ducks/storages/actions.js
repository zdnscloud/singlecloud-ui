import * as c from './constants';

/*
  actions
*/
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
