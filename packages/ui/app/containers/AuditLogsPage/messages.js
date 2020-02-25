/*
 * AuditLogsPage Messages
 *
 * This contains all the text for the AuditLogsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AuditLogsPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'AuditLogsPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of AuditLogsPage',
  },
  auditLogs: {
    id: `${scope}.auditLogs`,
    defaultMessage: 'auditLogs',
  },
  tableTitleUser: {
    id: `${scope}.tableTitleUser`,
    defaultMessage: 'User',
  },
  tableTitleSourceAddress: {
    id: `${scope}.tableTitleSourceAddress`,
    defaultMessage: 'SourceAddress',
  },
  tableTitleOperation: {
    id: `${scope}.tableTitleOperation`,
    defaultMessage: 'Operation',
  },
  tableTitleDetail: {
    id: `${scope}.tableTitleDetail`,
    defaultMessage: 'Detail',
  },
  tableTitleCreationTimestamp: {
    id: `${scope}.tableTitleCreationTimestamp`,
    defaultMessage: 'CreationTimestamp',
  },
  tableTitleResourceKind: {
    id: `${scope}.tableTitleResourceKind`,
    defaultMessage: 'ResourceKind',
  },
  tableTitleResourcePath: {
    id: `${scope}.tableTitleResourcePath`,
    defaultMessage: 'ResourcePath',
  },
});
