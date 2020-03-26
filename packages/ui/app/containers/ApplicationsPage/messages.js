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
  tableTitleType: {
    id: `${scope}.tableTitleKind`,
    defaultMessage: 'Kind',
  },
  tableTitleReplicas: {
    id: `${scope}.tableTitleReplicas`,
    defaultMessage: 'Replicas',
  },
  tableTitleExists: {
    id: `${scope}.tableTitleExists`,
    defaultMessage: 'Exists',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  removeAppText: {
    id: `${scope}.removeAppText`,
    defaultMessage:
      'This action permanently deletes the content. Continue or not？',
  },
  configurationOptions: {
    id: `${scope}.configurationOptions`,
    defaultMessage: 'Configuration Options',
  },
  createApplication: {
    id: `${scope}.createApplication`,
    defaultMessage: 'Create Application',
  },
  createApplicationDesc: {
    id: `${scope}.createApplicationDesc`,
    defaultMessage: 'Application Desc',
  },
  createApplicationButton: {
    id: `${scope}.createApplicationButton`,
    defaultMessage: 'Create',
  },
  cancleApplicationButton: {
    id: `${scope}.cancleApplicationButton`,
    defaultMessage: 'Cancle',
  },
  dynamicOptions: {
    id: `${scope}.dynamicOptions`,
    defaultMessage: 'Options',
  },
  formClusterName: {
    id: `${scope}.formClusterName`,
    defaultMessage: 'Cluster',
  },
  formNamespaceName: {
    id: `${scope}.formNamespaceName`,
    defaultMessage: 'Namespace',
  },
  formInjectServiceMesh: {
    id: `${scope}.formInjectServiceMesh`,
    defaultMessage: 'InjectServiceMesh',
  },
  formName: {
    id: `${scope}.formName`,
    defaultMessage: 'Name',
  },
  formChartVersion: {
    id: `${scope}.formChartVersion`,
    defaultMessage: 'ChartVersion',
  },
  monitorButton: {
    id: `${scope}.monitorButton`,
    defaultMessage: 'monitor',
  },
  unnormal:{
    id: `${scope}.unnormal`,
    defaultMessage: 'unnormal',
  },
  normal:{
    id: `${scope}.normal`,
    defaultMessage: 'normal',
  },
});
