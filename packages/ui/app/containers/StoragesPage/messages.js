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
  tableTitleNodes: {
    id: `${scope}.tableTitleNodes`,
    defaultMessage: 'Nodes',
  },
  tableTitleSize: {
    id: `${scope}.tableTitleSize`,
    defaultMessage: 'Size',
  },
  tableTitleUsedsize: {
    id: `${scope}.tableTitleUsedsize`,
    defaultMessage: 'Usedsize',
  },
  tableTitleFreesize: {
    id: `${scope}.tableTitleFreesize`,
    defaultMessage: 'Freesize',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  nodeName: {
    id: `${scope}.nodeName`,
    defaultMessage: 'Node',
  },
  size: {
    id: `${scope}.size`,
    defaultMessage: 'Total',
  },
  freesize: {
    id: `${scope}.freesize`,
    defaultMessage: 'Free',
  },
  usedsize: {
    id: `${scope}.usedsize`,
    defaultMessage: 'Used',
  },
  createStorageButton: {
    id: `${scope}.createStorageButton`,
    defaultMessage: 'createStorageButton',
  },
  formName: {
    id: `${scope}.formName`,
    defaultMessage: 'formName',
  },
  formStoragetype: {
    id: `${scope}.formStoragetype`,
    defaultMessage: 'formStoragetype',
  },
});
