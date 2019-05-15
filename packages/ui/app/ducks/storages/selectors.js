import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import {
  makeSelectClusterID,
} from 'containers/App/selectors';
import { prefix } from './constants';

/**
 * Direct selector to the nfsStorages duck
 */

const selectStoragesDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
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
    (storages, clusterID) =>
      storages.getIn([clusterID]) || storages.clear()
  );

export const makeSelectCurrentLVMStorages = () =>
  createSelector(
    makeSelectLVMStorages(),
    makeSelectClusterID(),
    (storages, clusterID) =>
      storages.getIn([clusterID]) || storages.clear()
  );

/**
 * Default selector used by LoginPage
 */

const makeSelectStorages = () =>
  createSelector(
    selectStoragesDomain,
    (substate) => substate
  );

export default makeSelectStorages;