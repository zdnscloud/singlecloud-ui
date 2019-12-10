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
    defaultMessage: 'latencyMsP50',
  },
  tableTitleLatencyMsP95: {
    id: `${scope}.tableTitleLatencyMsP95`,
    defaultMessage: 'latencyMsP95',
  },
  tableTitleLatencyMsP99: {
    id: `${scope}.tableTitleLatencyMsP99`,
    defaultMessage: 'latencyMsP99',
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
