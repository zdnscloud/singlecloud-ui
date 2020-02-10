/*
 * SvcMeshPodsPage Messages
 *
 * This contains all the text for the SvcMeshPodsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SvcMeshPodsPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'SvcMeshPodsPage',
  },
  svcMeshWorkloadDetails: {
    id: `${scope}.svcMeshWorkloadDetails`,
    defaultMessage: 'svcMeshWorkloadDetails',
  },
  svcMeshWorkloads: {
    id: `${scope}.svcMeshWorkloads`,
    defaultMessage: 'svcMeshWorkloads',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of SvcMeshPodsPage',
  },
  svcMeshPods: {
    id: `${scope}.svcMeshPods`,
    defaultMessage: 'svcMeshPods',
  },
  tableTitleResource: {
    id: `${scope}.tableTitleResource`,
    defaultMessage: 'Resource',
  },
  tableTitlePods: {
    id: `${scope}.tableTitlePods`,
    defaultMessage: 'Pods',
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
  inboundCardTitle: {
    id: `${scope}.InboundCardTitle`,
    defaultMessage: 'Inbound',
  },
  outboundCardTitle: {
    id: `${scope}.OutboundCardTitle`,
    defaultMessage: 'Outbound',
  },
  TCPCardTitle: {
    id: `${scope}.TCPCardTitle`,
    defaultMessage: 'TCP',
  },
  chartTableTitleSR: {
    id: `${scope}.chartTableTitleSR`,
    defaultMessage: 'SR',
  },
  chartTableTitleRPS: {
    id: `${scope}.chartTableTitleRPS`,
    defaultMessage: 'RPS',
  },
  chartTableTitleP99: {
    id: `${scope}.chartTableTitleP99`,
    defaultMessage: 'P99',
  },
});
