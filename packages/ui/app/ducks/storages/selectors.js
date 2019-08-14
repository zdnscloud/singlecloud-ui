import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentCluster } from 'ducks/clusters/selectors';
import { prefix } from './constants';

/**
 * Direct selector to the nfsStorages duck
 */

const selectStoragesDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectStorageClasses = () =>
  createSelector(
    selectStoragesDomain,
    (substate) => substate.get('storageClasses')
  );

export const makeSelectCurrentStorageClasses = () =>
  createSelector(
    makeSelectStorageClasses(),
    makeSelectClusterID(),
    (cs, clusterID) => cs.getIn([clusterID]) || cs.clear()
  );

export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentCluster(),
    (ns) => ns.getIn(['links', 'storageclusters'])
  );

export const makeSelectStorages = () =>
  createSelector(
    selectStoragesDomain,
    makeSelectClusterID(),
    (substate, clusterID) =>
      substate.getIn(['storages', clusterID]) || substate.clear()
  );

export const makeSelectStoragesList = () =>
  createSelector(
    selectStoragesDomain,
    makeSelectStorages(),
    (substate, storages) =>
      substate
        .get('storagesList')
        .map((id) => storages.get(id) || storages.clear())
  );

export const makeSelectNFSStorages = () =>
  createSelector(
    selectStoragesDomain,
    (substate) => substate.get('nfsStorages')
  );

export const makeSelectLVMStorages = () =>
  createSelector(
    selectStoragesDomain,
    (substate) => substate.get('lvmStorages')
  );

export const makeSelectCurrentNFSStorages = () =>
  createSelector(
    makeSelectNFSStorages(),
    makeSelectClusterID(),
    (storages, clusterID) => storages.getIn([clusterID]) || storages.clear()
  );

export const makeSelectCurrentLVMStorages = () =>
  createSelector(
    makeSelectLVMStorages(),
    makeSelectClusterID(),
    (storages, clusterID) => storages.getIn([clusterID]) || storages.clear()
  );

export const makeSelectBlockDevicesURL = () =>
  createSelector(
    makeSelectCurrentCluster(),
    (ns) => ns.getIn(['links', 'blockdevices'])
  );

export const makeSelectBlockDevices = () =>
  createSelector(
    selectStoragesDomain,
    makeSelectClusterID(),
    (substate, clusterID) =>
      substate.getIn(['blockDevices', clusterID]) || substate.clear()
  );

export const makeSelectBlockDevicesList = () =>
  createSelector(
    selectStoragesDomain,
    makeSelectBlockDevices(),
    (substate, blockDevices) =>
      substate
        .get('blockDevicesList')
        .map((id) => blockDevices.get(id) || blockDevices.clear())
  );

export const makeSelectStorageID = () =>
  createSelector(
    createMatchSelector('*/clusters/:cluster_id/storages/:storage_id/*'),
    (match) => {
      if (match && match.params) {
        return match.params.storage_id;
      }
      return '';
    }
  );

export const makeSelectCurrentStorage = () =>
  createSelector(
    makeSelectStorages(),
    makeSelectStorageID(),
    (storages, id) => storages.get(id) || storages.clear()
  );

/**
 * Default selector
 */
const makeSelectStoragesState = () =>
  createSelector(
    selectStoragesDomain,
    (substate) => substate
  );

export default makeSelectStoragesState;
