/*
 * AlarmMessagesPage Messages
 *
 * This contains all the text for the AlarmMessagesPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AlarmMessagesPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'AlarmMessagesPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of AlarmMessagesPage',
  },
  alarms: {
    id: `${scope}.alarms`,
    defaultMessage: 'alarms',
  },
  // 'status' 'cluster', 'namespace', 'object', 'type', 'detail'
  tableTitleStatus: {
    id: `${scope}.tableTitleStatus`,
    defaultMessage: 'Status',
  },
  tableTitleCreationTimestamp: {
    id: `${scope}.tableTitleCreationTimestamp`,
    defaultMessage: 'CreationTimestamp',
  },
  tableTitleCluster: {
    id: `${scope}.tableTitleCluster`,
    defaultMessage: 'Cluster',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  tableTitleNamespace: {
    id: `${scope}.tableTitleNamespace`,
    defaultMessage: 'Namespace',
  },
  tableTitleObject: {
    id: `${scope}.tableTitleObject`,
    defaultMessage: 'Object',
  },
  tableTitleType: {
    id: `${scope}.tableTitleType`,
    defaultMessage: 'Type',
  },
  tableTitleDetail: {
    id: `${scope}.tableTitleDetail`,
    defaultMessage: 'Detail',
  },
});
