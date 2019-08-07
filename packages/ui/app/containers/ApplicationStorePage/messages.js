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
    defaultMessage: 'ApplicationStorePage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of ApplicationStorePage',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ApplicationStorePage container!',
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
  createApplication: {
    id: `${scope}.createApplication`,
    defaultMessage: 'Create Application',
  },
  createApplicationButton: {
    id: `${scope}.createApplicationButton`,
    defaultMessage: 'Create',
  },
  cancleApplicationButton: {
    id: `${scope}.cancleApplicationButton`,
    defaultMessage: 'Cancle',
  },
  detailedDesc: {
    id: `${scope}.detailedDesc`,
    defaultMessage: 'Detailed Descriptions',
  },
  configurationOptions: {
    id: `${scope}.configurationOptions`,
    defaultMessage: 'Configuration Options',
  },
  formClusterName: {
    id: `${scope}.formClusterName`,
    defaultMessage: 'Cluster',
  },
  formNamespaceName: {
    id: `${scope}.formNamespaceName`,
    defaultMessage: 'Namespace',
  },
  formChartName: {
    id: `${scope}.formChartName`,
    defaultMessage: 'ChartName',
  },
  formChartVersion: {
    id: `${scope}.formChartVersion`,
    defaultMessage: 'ChartVersion',
  },
  formDBUserName: {
    id: `${scope}.formDBUserName`,
    defaultMessage: 'DB UserName',
  },
  formDBPwd: {
    id: `${scope}.formDBPwd`,
    defaultMessage: 'DB Pwd',
  },
});
