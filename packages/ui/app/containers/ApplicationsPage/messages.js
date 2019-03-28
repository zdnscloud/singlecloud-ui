/*
 * ApplicationsPage Messages
 *
 * This contains all the text for the ApplicationsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ApplicationsPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'ApplicationsPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of ApplicationsPage',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ApplicationsPage container!',
  },
  applications: {
    id: `${scope}.applications`,
    defaultMessage: 'Applications',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
});
