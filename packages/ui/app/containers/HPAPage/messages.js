/*
 * HPAPage Messages
 *
 * This contains all the text for the HPAPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HPAPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'HPAPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of HPAPage',
  },
  HPA: {
    id: `${scope}.HPA`,
    defaultMessage: 'HPA',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleApp: {
    id: `${scope}.tableTitleApp`,
    defaultMessage: 'App',
  },
  tableTitleMetrics: {
    id: `${scope}.tableTitleMetrics`,
    defaultMessage: 'Metrics',
  },
  tableTitleCurrentReplicas: {
    id: `${scope}.tableTitleCurrentReplicas`,
    defaultMessage: 'CurrentReplicas',
  },
  tableTitleDesiredReplicas: {
    id: `${scope}.tableTitleDesiredReplicas`,
    defaultMessage: 'DesiredReplicas',
  },
  tableTitleReplicasScope: {
    id: `${scope}.tableTitleReplicasScope`,
    defaultMessage: 'Replicas Scope',
  },
  tableTitleCreationTimestamp: {
    id: `${scope}.tableTitleCreationTimestamp`,
    defaultMessage: 'CreationTimestamp',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  createPageTitle: {
    id: `${scope}.createPageTitle`,
    defaultMessage: 'Create HPA',
  },
  createPageDesc: {
    id: `${scope}.createPageDesc`,
    defaultMessage: 'Description of Create HPA',
  },
  createHPA: {
    id: `${scope}.createHPA`,
    defaultMessage: 'Create HPA',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  cancle: {
    id: `${scope}.cancle`,
    defaultMessage: 'Cancle',
  },
  formName: {
    id: `${scope}.formName`,
    defaultMessage: 'Name',
  },
  formScaleTargetKind: {
    id: `${scope}.formScaleTargetKind`,
    defaultMessage: 'ScaleTargetKind',
  },
  formDeployment: {
    id: `${scope}.formDeployment`,
    defaultMessage: 'Deployment',
  },
  formStatefulset: {
    id: `${scope}.formStatefulset`,
    defaultMessage: 'Statefulset',
  },
  formScaleTargetName: {
    id: `${scope}.formScaleTargetName`,
    defaultMessage: 'ScaleTargetName',
  },
  formMaxReplicas: {
    id: `${scope}.formMaxReplicas`,
    defaultMessage: 'MaxReplicas',
  },
  formMinReplicas: {
    id: `${scope}.formMinReplicas`,
    defaultMessage: 'MinReplicas',
  },
  formMetricsType: {
    id: `${scope}.formMetricsType`,
    defaultMessage: 'MetricsType',
  },
  formResourceMetrics: {
    id: `${scope}.formResourceMetrics`,
    defaultMessage: 'ResourceMetrics',
  },
  formCustomMetrics: {
    id: `${scope}.formCustomMetrics`,
    defaultMessage: 'CustomMetrics',
  },
  formMetricName: {
    id: `${scope}.formMetricName`,
    defaultMessage: 'MetricName',
  },
  formCpu: {
    id: `${scope}.formCpu`,
    defaultMessage: 'CPU',
  },
  formMemory: {
    id: `${scope}.formMemory`,
    defaultMessage: 'Memory',
  },
  formTargetType: {
    id: `${scope}.formTargetType`,
    defaultMessage: 'TargetType',
  },
  formUtilization: {
    id: `${scope}.formUtilization`,
    defaultMessage: 'Utilization',
  },
  formAverageValue: {
    id: `${scope}.formAverageValue`,
    defaultMessage: 'AverageValue',
  },
  formNumerical: {
    id: `${scope}.formNumerical`,
    defaultMessage: 'Numerical',
  },
  updatePageTitle: {
    id: `${scope}.updatePageTitle`,
    defaultMessage: 'Update HPA',
  },
  updatePageDesc: {
    id: `${scope}.updatePageDesc`,
    defaultMessage: 'Description of Update HPA',
  },
  updateHPA: {
    id: `${scope}.updateHPA`,
    defaultMessage: 'Update HPA',
  },
  update: {
    id: `${scope}.update`,
    defaultMessage: 'Update',
  },
  showPageTitle: {
    id: `${scope}.showPageTitle`,
    defaultMessage: 'Show HPA',
  },
  showHPA: {
    id: `${scope}.showHPA`,
    defaultMessage: 'Show HPA',
  },
  formCPUSuffix: {
    id: `${scope}.formCPUSuffix`,
    defaultMessage: 'He',
  },
  editButton: {
    id: `${scope}.editButton`,
    defaultMessage: 'edit',
  },
});
