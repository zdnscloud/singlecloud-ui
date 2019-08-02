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
  clusterName: {
    id: `${scope}.clusterName`,
    defaultMessage: 'Name',
  },
  clusterVersion: {
    id: `${scope}.clusterVersion`,
    defaultMessage: 'Version',
  },
  clusterNodes: {
    id: `${scope}.clusterNodes`,
    defaultMessage: 'Nodes',
  },
  clusterCreated: {
    id: `${scope}.clusterCreated`,
    defaultMessage: 'Created',
  },
  clusterCPU: {
    id: `${scope}.clusterCPU`,
    defaultMessage: 'CPU',
  },
  clusterCPUCore: {
    id: `${scope}.clusterCPUCore`,
    defaultMessage: 'Core',
  },
  clusterMemory: {
    id: `${scope}.clusterMemory`,
    defaultMessage: 'Memory',
  },
  clusterPods: {
    id: `${scope}.clusterPods`,
    defaultMessage: 'Pods',
  },
});
