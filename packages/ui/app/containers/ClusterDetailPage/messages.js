/*
 * ClusterDetailPage Messages
 *
 * This contains all the text for the ClusterDetailPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ClusterDetailPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'This is the ClusterDetailPage title!',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'This is the ClusterDetailPage description!',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ClusterDetailPage header!',
  },
  clusterDetail: {
    id: `${scope}.clusterDetail`,
    defaultMessage: 'Cluster {name}',
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
