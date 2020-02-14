/*
 * ClustersPage Messages
 *
 * This contains all the text for the ClustersPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ClustersPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'This is the ClustersPage title!',
  },
  pageTitleClusterManage: {
    id: `${scope}.pageTitleClusterManage`,
    defaultMessage: 'Cluster Manage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'This is the ClustersPage description!',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ClustersPage header!',
  },
  clusters: {
    id: `${scope}.clusters`,
    defaultMessage: 'Clusters',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleNodeCount: {
    id: `${scope}.tableTitleNodeCount`,
    defaultMessage: 'NodeCount',
  },
  tableTitleCreationTimestamp: {
    id: `${scope}.tableTitleCreationTimestamp`,
    defaultMessage: 'CreationTimestamp',
  },
  tableTitleStatus: {
    id: `${scope}.tableTitleStatus`,
    defaultMessage: 'Status',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  createCluster: {
    id: `${scope}.createCluster`,
    defaultMessage: 'This is the  createCluster!',
  },
  formCreate: {
    id: `${scope}.formCreate`,
    defaultMessage: 'formCreate',
  },
  formNode: {
    id: `${scope}.formNode`,
    defaultMessage: 'formNode',
  },
  formClusterName: {
    id: `${scope}.formClusterName`,
    defaultMessage: 'formClusterName',
  },
  formClusterSuffix: {
    id: `${scope}.formClusterSuffix`,
    defaultMessage: 'formClusterSuffix',
  },
  formSSHPort: {
    id: `${scope}.formSSHPort`,
    defaultMessage: 'formSSHPort',
  },
  formSSHUser: {
    id: `${scope}.formSSHUser`,
    defaultMessage: 'formSSHUser',
  },
  formSSHKey: {
    id: `${scope}.formSSHKey`,
    defaultMessage: 'formSSHKey',
  },
  formAdvancedOptions: {
    id: `${scope}.formAdvancedOptions`,
    defaultMessage: 'formAdvancedOptions',
  },
  formServiceIP: {
    id: `${scope}.formServiceIP`,
    defaultMessage: 'formServiceIP',
  },
  formPodIP: {
    id: `${scope}.formPodIP`,
    defaultMessage: 'formPodIP',
  },
  formClustersNet: {
    id: `${scope}.formClustersNet`,
    defaultMessage: 'formClustersNet',
  },
  formNetIface: {
    id: `${scope}.formNetIface`,
    defaultMessage: 'formNetIface',
  },
  formClustersDNSIP: {
    id: `${scope}.formClustersDNSIP`,
    defaultMessage: 'formClustersDNSIP',
  },
  formForwardDNSFirst: {
    id: `${scope}.formForwardDNSFirst`,
    defaultMessage: 'formForwardDNSFirst',
  },
  formForwardDNSSecond: {
    id: `${scope}.formForwardDNSSecond`,
    defaultMessage: 'formForwardDNSSecond',
  },
  formSinglecloudUrl: {
    id: `${scope}.formSinglecloudUrl`,
    defaultMessage: 'formSinglecloudUrl',
  },
  formAddNode: {
    id: `${scope}.formAddNode`,
    defaultMessage: 'formAddNode',
  },
  formHostName: {
    id: `${scope}.formHostName`,
    defaultMessage: 'formHostName',
  },
  formMainNode: {
    id: `${scope}.formMainNode`,
    defaultMessage: 'formMainNode',
  },
  formETCDNode: {
    id: `${scope}.formETCDNode`,
    defaultMessage: 'formETCDNode',
  },
  formWorkNode: {
    id: `${scope}.formWorkNode`,
    defaultMessage: 'formWorkNode',
  },
  formBoundaryNode: {
    id: `${scope}.formBoundaryNode`,
    defaultMessage: 'formBoundaryNode',
  },
  formLoadBalanceEnable: {
    id: `${scope}.formLoadBalanceEnable`,
    defaultMessage: 'formLoadBalanceEnable',
  },
  formLoadBalanceMasterServer: {
    id: `${scope}.formLoadBalanceMasterServer`,
    defaultMessage: 'formLoadBalanceMasterServer',
  },
  formLoadBalanceBackupServer: {
    id: `${scope}.formLoadBalanceBackupServer`,
    defaultMessage: 'formLoadBalanceBackupServer',
  },
  formLoadBalanceUser: {
    id: `${scope}.formLoadBalanceUser`,
    defaultMessage: 'formLoadBalanceUser',
  },
  formLoadBalancePassword: {
    id: `${scope}.formLoadBalancePassword`,
    defaultMessage: 'formLoadBalancePassword',
  },
  createClusterButton: {
    id: `${scope}.createClusterButton`,
    defaultMessage: 'createClusterButton',
  },
  cancleClustersButton: {
    id: `${scope}.cancleClustersButton`,
    defaultMessage: 'cancleClustersButton',
  },
  viewLog: {
    id: `${scope}.viewLog`,
    defaultMessage: 'View Log',
  },
  formAddMainNode: {
    id: `${scope}.formAddMainNode`,
    defaultMessage: 'formAddMainNode',
  },
  formAddWorkNode: {
    id: `${scope}.formAddWorkNode`,
    defaultMessage: 'formAddWorkNode',
  },
  basicInfo: {
    id: `${scope}.basicInfo`,
    defaultMessage: 'BasicInfo',
  },
  zcloudVersion: {
    id: `${scope}.zcloudVersion`,
    defaultMessage: 'zcloudVersion',
  },
  runningStatus: {
    id: `${scope}.runningStatus`,
    defaultMessage: 'Running',
  },
  updatingStatus: {
    id: `${scope}.updatingStatus`,
    defaultMessage: 'Updating',
  },
  CreateFailedStatus: {
    id: `${scope}.CreateFailedStatus`,
    defaultMessage: 'CreateFailed',
  },
  creatingStatus: {
    id: `${scope}.creatingStatus`,
    defaultMessage: 'Creating',
  },
  deletingStatus: {
    id: `${scope}.deletingStatus`,
    defaultMessage: 'Deleting',
  },
  unreachableStatus: {
    id: `${scope}.unreachableStatus`,
    defaultMessage: 'Unreachable',
  },
  shellButton: {
    id: `${scope}.shellButton`,
    defaultMessage: 'Shell',
  },
  updateLogButton: {
    id: `${scope}.updateLogButton`,
    defaultMessage: 'UpdateLog',
  },
  stopButton: {
    id: `${scope}.stopButton`,
    defaultMessage: 'Stop',
  },
  nodeList: {
    id: `${scope}.nodeList`,
    defaultMessage: 'NodeList',
  },
  tableTitleAddress: {
    id: `${scope}.tableTitleAddress`,
    defaultMessage: 'Address',
  },
  tableTitleRoles: {
    id: `${scope}.tableTitleRoles`,
    defaultMessage: 'Role',
  },
  nodeTitle: {
    id: `${scope}.nodeTitle`,
    defaultMessage: 'Cluster Node Title',
  },
  stopPromptText: {
    id: `${scope}.dialogContentText`,
    defaultMessage: 'This action  stop the content. Continue or not？',
  },
  logTitle: {
    id: `${scope}.logTitle`,
    defaultMessage: 'Cluster Log Title',
  },
  logClose: {
    id: `${scope}.logClose`,
    defaultMessage: 'Close Log',
  },
  manageButton:{
    id: `${scope}.manageButton`,
    defaultMessage: 'manage',
  },
});
