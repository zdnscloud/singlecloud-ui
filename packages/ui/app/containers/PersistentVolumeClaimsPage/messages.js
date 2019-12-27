/*
 * PersistentVolumeClaimsPage Messages
 *
 * This contains all the text for the PersistentVolumeClaimsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.PersistentVolumeClaimsPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'PersistentVolumeClaimsPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of PersistentVolumeClaimsPage',
  },
  persistentVolumeClaims: {
    id: `${scope}.persistentVolumeClaims`,
    defaultMessage: 'persistentVolumeClaims',
  },
  tableTitleUsed: {
    id: `${scope}.tableTitleUsed`,
    defaultMessage: 'Used',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleActualStorageSize: {
    id: `${scope}.tableTitleActualStorageSize`,
    defaultMessage: 'ActualStorageSize',
  },
  tableTitlePods: {
    id: `${scope}.tableTitlePods`,
    defaultMessage: 'Pods',
  },
  tableTitleNode: {
    id: `${scope}.tableTitleNode`,
    defaultMessage: 'Node',
  },
  tableTitleStorageClassName: {
    id: `${scope}.tableTitleStorageClassName`,
    defaultMessage: 'StorageClassName',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  tableContentUsed: {
    id: `${scope}.tableContentUsed`,
    defaultMessage: 'Used',
  },
  tableContentUnused: {
    id: `${scope}.tableContentUnused`,
    defaultMessage: 'Unused',
  },
});
