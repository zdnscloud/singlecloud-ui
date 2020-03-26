/*
 * ApplicationStorePage Messages
 *
 * This contains all the text for the ApplicationStorePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ApplicationStorePage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'ZcloudCharts Title',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of ZcloudChartsPage',
  },
  pageTitleUsers: {
    id: `${scope}.pageTitleUsers`,
    defaultMessage: 'UsersCharts Title',
  },
  pageDescUsers: {
    id: `${scope}.pageDescUsers`,
    defaultMessage: 'Description of UsersCharsPage',
  },
  applicationStore: {
    id: `${scope}.applicationStore`,
    defaultMessage: 'ApplicationStore',
  },
  searchApplicationsButton: {
    id: `${scope}.searchApplicationsButton`,
    defaultMessage: 'Search',
  },
  searchFormApplicationName: {
    id: `${scope}.searchFormApplicationName`,
    defaultMessage: 'ApplicationName',
  },
  viewDetailButton: {
    id: `${scope}.viewDetailButton`,
    defaultMessage: 'detailed',
  },
});
