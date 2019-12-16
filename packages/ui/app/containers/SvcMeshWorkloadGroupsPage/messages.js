/*
 * SvcMeshWorkloadGroupsPage Messages
 *
 * This contains all the text for the SvcMeshWorkloadGroupsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SvcMeshWorkloadGroupsPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'SvcMeshWorkloadGroupsPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of SvcMeshWorkloadGroupsPage',
  },
  svcMeshWorkloadGroups: {
    id: `${scope}.svcMeshWorkloadGroups`,
    defaultMessage: 'svcMeshWorkloadGroups',
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
});
