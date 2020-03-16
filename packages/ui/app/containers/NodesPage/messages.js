/*
 * NodesPage Messages
 *
 * This contains all the text for the NodesPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NodesPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'This is the NodesPage title!',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'This is the NodesPage description!',
  },
  nodeDetails: {
    id: `${scope}.nodeDetails`,
    defaultMessage: 'This is the NodesPage description!',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NodesPage header!',
  },
  nodes: {
    id: `${scope}.nodes`,
    defaultMessage: 'Nodes',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleAddress: {
    id: `${scope}.tableTitleAddress`,
    defaultMessage: 'Address',
  },
  tableTitleRoles: {
    id: `${scope}.tableTitleRoles`,
    defaultMessage: 'Role',
  },
  tableTitleStatus: {
    id: `${scope}.tableTitleStatus`,
    defaultMessage: 'Status',
  },
  tableTitleOperatingSystemImage: {
    id: `${scope}.tableTitleOperatingSystemImage`,
    defaultMessage: 'OperatingSystemImage',
  },
  tableTitleCreationTimestamp: {
    id: `${scope}.tableTitleCreationTimestamp`,
    defaultMessage: 'CreationTimestamp',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  nodeInfo: {
    id: `${scope}.nodeInfo`,
    defaultMessage: 'NodeInfo',
  },
  nodeName: {
    id: `${scope}.nodeName`,
    defaultMessage: 'NodeName',
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: 'Address',
  },
  roles: {
    id: `${scope}.roles`,
    defaultMessage: 'Roles',
  },
  dockerVersion: {
    id: `${scope}.dockerVersion`,
    defaultMessage: 'DockerVersion',
  },
  operatingSystemImage: {
    id: `${scope}.operatingSystemImage`,
    defaultMessage: 'OperatingSystemImage',
  },
  operatingSystem: {
    id: `${scope}.operatingSystem`,
    defaultMessage: 'OperatingSystem',
  },
  creationTimestamp: {
    id: `${scope}.creationTimestamp`,
    defaultMessage: 'creationTimestamp',
  },
  cpu: {
    id: `${scope}.cpu`,
    defaultMessage: 'CPU',
  },
  memory: {
    id: `${scope}.memory`,
    defaultMessage: 'Memory',
  },
  pods: {
    id: `${scope}.pods`,
    defaultMessage: 'Pods',
  },
  labels: {
    id: `${scope}.labels`,
    defaultMessage: 'Labels',
  },
  annotations: {
    id: `${scope}.annotations`,
    defaultMessage: 'Annotations',
  },
  key: {
    id: `${scope}.key`,
    defaultMessage: 'Key',
  },
  value: {
    id: `${scope}.value`,
    defaultMessage: 'Value',
  },
  tableCordonBtn: {
    id: `${scope}.tableCordonBtn`,
    defaultMessage: 'Cordon',
  },
  tableDrainBtn: {
    id: `${scope}.tableDrainBtn`,
    defaultMessage: 'Drain',
  },
  tableUncordonBtn: {
    id: `${scope}.tableUncordonBtn`,
    defaultMessage: 'Uncordon',
  },
  cordonPromptText: {
    id: `${scope}.cordonPromptText`,
    defaultMessage: 'Are you sure you want to do operation cordon ?',
  },
  drainPromptText: {
    id: `${scope}.drainPromptText`,
    defaultMessage: 'Are you sure you want to do operation drain',
  },
  uncordonPromptText: {
    id: `${scope}.uncordonPromptText`,
    defaultMessage: 'Are you sure you want to do operation uncordon',
  },
});
