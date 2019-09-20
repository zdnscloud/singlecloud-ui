/*
 * StoragePage Messages
 *
 * This contains all the text for the StoragePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.StoragePage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'StoragePage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of StoragePage',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the StoragePage container!',
  },
  storages: {
    id: `${scope}.storages`,
    defaultMessage: 'Storages',
  },
  createStorage: {
    id: `${scope}.createStorage`,
    defaultMessage: 'CreateStorage',
  },
  editStorage: {
    id: `${scope}.editStorage`,
    defaultMessage: 'EditStorage',
  },
  storageDetail: {
    id: `${scope}.storageDetail`,
    defaultMessage: 'StorageDetail',
  },
  storage: {
    id: `${scope}.storage`,
    defaultMessage: 'Storage',
  },
  lvm: {
    id: `${scope}.lvm`,
    defaultMessage: 'LVM',
  },
  nfs: {
    id: `${scope}.nfs`,
    defaultMessage: 'NFS',
  },
  pvList: {
    id: `${scope}.pvList`,
    defaultMessage: 'PV List',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleStorageType: {
    id: `${scope}.tableTitleStorageType`,
    defaultMessage: 'StorageType',
  },
  tableTitleHosts: {
    id: `${scope}.tableTitleHosts`,
    defaultMessage: 'Hosts',
  },
  tableTitleSize: {
    id: `${scope}.tableTitleSize`,
    defaultMessage: 'Size',
  },
  tableTitleUsedSize: {
    id: `${scope}.tableTitleUsedSize`,
    defaultMessage: 'UsedSize',
  },
  tableTitleFreeSize: {
    id: `${scope}.tableTitleFreeSize`,
    defaultMessage: 'FreeSize',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  tableTitlePods: {
    id: `${scope}.tableTitlePods`,
    defaultMessage: 'Pods',
  },
  tableTitleNode: {
    id: `${scope}.tableTitleNode`,
    defaultMessage: 'Node',
  },
  tableTitlePhase: {
    id: `${scope}.tableTitlePhase`,
    defaultMessage: 'Phase',
  },
  nodeName: {
    id: `${scope}.nodeName`,
    defaultMessage: 'Node',
  },
  size: {
    id: `${scope}.size`,
    defaultMessage: 'Total',
  },
  freeSize: {
    id: `${scope}.freeSize`,
    defaultMessage: 'Free',
  },
  usedSize: {
    id: `${scope}.usedSize`,
    defaultMessage: 'Used',
  },
  createStorageButton: {
    id: `${scope}.createStorageButton`,
    defaultMessage: 'createStorageButton',
  },
  editStorageButton: {
    id: `${scope}.editStorageButton`,
    defaultMessage: 'editStorageButton',
  },
  formStorage: {
    id: `${scope}.formStorage`,
    defaultMessage: 'formStorage',
  },
  formName: {
    id: `${scope}.formName`,
    defaultMessage: 'formName',
  },
  formStorageType: {
    id: `${scope}.formStorageType`,
    defaultMessage: 'formStorageType',
  },
  formHostnames: {
    id: `${scope}.formHostnames`,
    defaultMessage: 'formHostnames',
  },
  formNodeName: {
    id: `${scope}.formNodeName`,
    defaultMessage: 'formNodeName',
  },
  formBlockDevices: {
    id: `${scope}.formBlockDevices`,
    defaultMessage: 'formBlockDevices',
  },
});
