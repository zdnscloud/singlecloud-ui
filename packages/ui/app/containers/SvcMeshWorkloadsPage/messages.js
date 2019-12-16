/*
 * SvcMeshWorkloadsPage Messages
 *
 * This contains all the text for the SvcMeshWorkloadsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SvcMeshWorkloadsPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'SvcMeshWorkloadsPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of SvcMeshWorkloadsPage',
  },
  svcMeshWorkloads: {
    id: `${scope}.svcMeshWorkloads`,
    defaultMessage: 'svcMeshWorkloads',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleCreationTimestamp: {
    id: `${scope}.tableTitleCreationTimestamp`,
    defaultMessage: 'CreationTimestamp',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
});
