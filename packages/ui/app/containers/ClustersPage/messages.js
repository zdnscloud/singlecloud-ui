/*
 * ClustersPage Messages
 *
 * This contains all the text for the ClustersPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ClustersPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'This is the ClustersPage title!',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'This is the ClustersPage description!',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ClustersPage header!',
  },
  clusters: {
    id: `${scope}.clusters`,
    defaultMessage: 'Clusters',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleNodeCount: {
    id: `${scope}.tableTitleNodeCount`,
    defaultMessage: 'NodeCount',
  },
  tableTitleVersion: {
    id: `${scope}.tableTitleVersion`,
    defaultMessage: 'Version',
  },
  tableTitleCreationTimestamp: {
    id: `${scope}.tableTitleCreationTimestamp`,
    defaultMessage: 'CreationTimestamp',
  },
  tableTitleLinks: {
    id: `${scope}.tableTitleLinks`,
    defaultMessage: 'Links',
  },
});
