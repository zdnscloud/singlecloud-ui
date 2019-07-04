/*
 * NodesPage Messages
 *
 * This contains all the text for the NodesPage container.
 */

import { defineMessages } from 'react-intl';

import tableSchema from './tableSchema';

export const scope = 'app.containers.NodesPage';

// eslint-disable-next-line
const table = tableSchema.reduce(
  (schema, col) => ({
    [`tableTitle${col.label}`]: {
      id: `${scope}.tableTitle${col.label}`,
      defaultMessage: col.label,
    },
    ...schema,
  }),
  {}
);

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
  tableTitleLabels: {
    id: `${scope}.tableTitleLabels`,
    defaultMessage: 'Labels',
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
  createNode: {
    id: `${scope}.createNode`,
    defaultMessage: 'CreateNode',
  },
  formAddNode: {
    id: `${scope}.formAddNode`,
    defaultMessage: 'AddNode',
  },
  formHostName: {
    id: `${scope}.formHostName`,
    defaultMessage: 'HostName',
  },
  formMainNode: {
    id: `${scope}.formMainNode`,
    defaultMessage: 'MainNode',
  },
  formETCDNode: {
    id: `${scope}.formETCDNode`,
    defaultMessage: 'ETCDNode',
  },
  formWorkNode: {
    id: `${scope}.formWorkNode`,
    defaultMessage: 'WorkNode',
  },
  formBoundaryNode: {
    id: `${scope}.formBoundaryNode`,
    defaultMessage: 'BoundaryNode',
  },
  createNodeButton: {
    id: `${scope}.createNodeButton`,
    defaultMessage: 'createNodeButton',
  },
  cancleNodesButton: {
    id: `${scope}.cancleNodesButton`,
    defaultMessage: 'cancleNodeButton',
  },
});
