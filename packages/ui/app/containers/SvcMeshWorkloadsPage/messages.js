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
  svcMeshWorkloadGroupspageTitle: {
    id: `${scope}.svcMeshWorkloadGroupspageTitle`,
    defaultMessage: 'svcMeshWorkloadGroupspage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of SvcMeshWorkloadsPage',
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
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  inboundCardTitle: {
    id: `${scope}.InboundCardTitle`,
    defaultMessage: 'Inbound',
  },
  outboundCardTitle: {
    id: `${scope}.OutboundCardTitle`,
    defaultMessage: 'Outbound',
  },
  podsCardTitle: {
    id: `${scope}.PodsCardTitle`,
    defaultMessage: 'Pods',
  },
  TCPCardTitle: {
    id: `${scope}.TCPCardTitle`,
    defaultMessage: 'TCP',
  },
});
