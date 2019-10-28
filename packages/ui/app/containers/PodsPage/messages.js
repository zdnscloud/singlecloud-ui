/*
 * PodsPage Messages
 *
 * This contains all the text for the PodsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.PodsPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'PodsPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of PodsPage',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the PodsPage container!',
  },
  pods: {
    id: `${scope}.pods`,
    defaultMessage: 'Pods',
  },
  tableTitleState: {
    id: `${scope}.tableTitleState`,
    defaultMessage: 'State',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleNodeName: {
    id: `${scope}.tableTitleNodeName`,
    defaultMessage: 'NodeName',
  },
  tableTitleContainers: {
    id: `${scope}.tableTitleContainers`,
    defaultMessage: 'Containers',
  },
  tableTitleCreationTimestamp: {
    id: `${scope}.tableTitleCreationTimestamp`,
    defaultMessage: 'CreationTimestamp',
  },
  tableTitleLogs: {
    id: `${scope}.tableTitleLogs`,
    defaultMessage: 'Logs',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  restartButton: {
    id: `${scope}.restartButton `,
    defaultMessage: 'restart',
  },
  restartDialogContentText: {
    id: `${scope}.restartDialogContentText `,
    defaultMessage:
      'This action permanently restart the pod. Continue or not？',
  },
  viewLog: {
    id: `${scope}.viewLog`,
    defaultMessage: 'View Log',
  },
  logTitle: {
    id: `${scope}.logTitle`,
    defaultMessage: 'Container Log',
  },
  logClose: {
    id: `${scope}.logClose`,
    defaultMessage: 'Close Log',
  },
});
