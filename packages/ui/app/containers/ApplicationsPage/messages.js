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
  searchApplicationsButton: {
    id: `${scope}.searchApplicationsButton`,
    defaultMessage: 'Search',
  },
  searchFormApplicationName: {
    id: `${scope}.searchFormApplicationName`,
    defaultMessage: 'ApplicationName',
  },
  applicationDetail: {
    id: `${scope}.applicationDetail`,
    defaultMessage: 'Application Detail',
  },
  detailedDesc: {
    id: `${scope}.detailedDesc`,
    defaultMessage: 'Detailed Descriptions',
  },
  quotasList: {
    id: `${scope}.quotasList`,
    defaultMessage: 'Quotas List',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleKind: {
    id: `${scope}.tableTitleKind`,
    defaultMessage: 'Kind',
  },
});
