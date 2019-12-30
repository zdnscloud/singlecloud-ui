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
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
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
