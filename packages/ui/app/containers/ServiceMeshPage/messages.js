/*
 * ServiceMeshPage Messages
 *
 * This contains all the text for the ServiceMeshPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ServiceMeshPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'ServiceMeshPage',
  },
  workloadDetailPageTitle: {
    id: `${scope}.workloadDetailPageTitle`,
    defaultMessage: 'WorkloadDetail',
  },
  podDetailPageTitle: {
    id: `${scope}.podDetailPageTitle`,
    defaultMessage: 'PodDetail',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of ServiceMeshPage',
  },
  serviceMesh: {
    id: `${scope}.serviceMesh`,
    defaultMessage: 'serviceMesh',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleType: {
    id: `${scope}.tableTitleType`,
    defaultMessage: 'Type',
  },
  tableTitleMeshed: {
    id: `${scope}.tableTitleMeshed`,
    defaultMessage: 'Meshed',
  },
  tableTitleSuccessRate: {
    id: `${scope}.tableTitleSuccessRate`,
    defaultMessage: 'SuccessRate',
  },
  tableTitleRPS: {
    id: `${scope}.tableTitleSuccessRPS`,
    defaultMessage: 'RPS',
  },
  tableTitleLatencyMsP50: {
    id: `${scope}.tableTitleLatencyMsP50`,
    defaultMessage: 'LatencyMsP50',
  },
  tableTitleLatencyMsP95: {
    id: `${scope}.tableTitleLatencyMsP95`,
    defaultMessage: 'LatencyMsP95',
  },
  tableTitleLatencyMsP99: {
    id: `${scope}.tableTitleLatencyMsP99`,
    defaultMessage: 'LatencyMsP99',
  },
  tableTitleResource: {
    id: `${scope}.tableTitleResource`,
    defaultMessage: 'Resource',
  },
  tableTitlePods: {
    id: `${scope}.tableTitlePods`,
    defaultMessage: 'Pods',
  },
  tableTitleConnections: {
    id: `${scope}.tableTitleConnections`,
    defaultMessage: 'Connections',
  },
  tableTitleReadBytes: {
    id: `${scope}.tableTitleReadBytes`,
    defaultMessage: 'Read Bytes/ sec',
  },
  tableTitleWriteBytes: {
    id: `${scope}.tableTitleWriteBytes`,
    defaultMessage: 'Write Bytes / sec',
  },
  tableTitleCreationTimestamp: {
    id: `${scope}.tableTitleCreationTimestamp`,
    defaultMessage: 'CreationTimestamp',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  tableTitleSR: {
    id: `${scope}.tableTitleSR`,
    defaultMessage: 'SR',
  },
  tableTitlePercentage: {
    id: `${scope}.tableTitlePercentage`,
    defaultMessage: '100.00%',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  WorkloadCardTitle: {
    id: `${scope}.WorkloadCardTitle`,
    defaultMessage: 'Workload',
  },
  InboundCardTitle: {
    id: `${scope}.InboundCardTitle`,
    defaultMessage: 'Inbound',
  },
  OutboundCardTitle: {
    id: `${scope}.OutboundCardTitle`,
    defaultMessage: 'Outbound',
  },
  PodsCardTitle: {
    id: `${scope}.PodsCardTitle`,
    defaultMessage: 'Pods',
  },
  TCPCardTitle: {
    id: `${scope}.TCPCardTitle`,
    defaultMessage: 'TCP',
  },
});
