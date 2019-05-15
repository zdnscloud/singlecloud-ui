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
  tableTitleSize: {
    id: `${scope}.tableTitleSize`,
    defaultMessage: 'Size',
  },
  tableTitlePods: {
    id: `${scope}.tableTitlePods`,
    defaultMessage: 'Pods',
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
});