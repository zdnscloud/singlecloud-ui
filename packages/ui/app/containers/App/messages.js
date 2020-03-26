/*
 * App Messages
 *
 * This contains all the text for the App container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.App';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'App',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of App',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the App container!',
  },
  cluster: {
    id: `${scope}.cluster`,
    defaultMessage: 'Cluster ',
  },
  global: {
    id: `${scope}.global`,
    defaultMessage: 'Global',
  },
  userProfile: {
    id: `${scope}.userProfile`,
    defaultMessage: 'Profile',
  },
  userEdit: {
    id: `${scope}.userEdit`,
    defaultMessage: 'Edit',
  },
  userUserQuotas: {
    id: `${scope}.userUserQuotas`,
    defaultMessage: 'UserQuotas',
  },
  userPasswd: {
    id: `${scope}.userPasswd`,
    defaultMessage: 'Passwd',
  },
  userList: {
    id: `${scope}.userList`,
    defaultMessage: 'List',
  },
  userLogout: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout',
  },
  clusterEvents: {
    id: `${scope}.clusterEvents`,
    defaultMessage: 'Cluster Events',
  },
  leftMenuGlobal: {
    id: `${scope}.leftMenuGlobal`,
    defaultMessage: 'Global',
  },
  leftMenuGlobalConfiguration: {
    id: `${scope}.leftMenuGlobalConfiguration`,
    defaultMessage: 'GlobalConfiguration',
  },
  leftMenuClusterManagement: {
    id: `${scope}.leftMenuClusterManagement`,
    defaultMessage: 'ClusterManagement',
  },
  leftMenuServiceGovernance: {
    id: `${scope}.leftMenuServiceGovernance`,
    defaultMessage: 'ServiceGovernance',
  },
  leftMenuOverview: {
    id: `${scope}.leftMenuOverview`,
    defaultMessage: 'Overview',
  },
  leftMenuNamespaces: {
    id: `${scope}.leftMenuNamespaces`,
    defaultMessage: 'Namespaces',
  },
  leftMenuNodes: {
    id: `${scope}.leftMenuNodes`,
    defaultMessage: 'Nodes',
  },
  leftMenuResourceQuota: {
    id: `${scope}.leftMenuResourceQuota`,
    defaultMessage: 'Resource Quota',
  },
  leftMenuAppManagement: {
    id: `${scope}.leftMenuAppManagement`,
    defaultMessage: 'AppManagement',
  },
  leftMenuHPA: {
    id: `${scope}.leftMenuHPA`,
    defaultMessage: 'HPA',
  },
  leftMenuDeployments: {
    id: `${scope}.leftMenuDeployments`,
    defaultMessage: 'Deployments',
  },
  leftMenuStatefulSet: {
    id: `${scope}.leftMenuStatefulSet`,
    defaultMessage: 'StatefulSet',
  },
  leftMenuNamespaceOverview: {
    id: `${scope}.leftMenuNamespaceOverview`,
    defaultMessage: 'NamespaceOverview',
  },
  leftMenuDaemonSet: {
    id: `${scope}.leftMenuDaemonSet`,
    defaultMessage: 'DaemonSet',
  },
  leftMenuCronJob: {
    id: `${scope}.leftMenuCronJob`,
    defaultMessage: 'CronJob',
  },
  leftMenuJob: {
    id: `${scope}.leftMenuJob`,
    defaultMessage: 'Job',
  },
  leftMenuPersistentVolumeClaims: {
    id: `${scope}.leftMenuPersistentVolumeClaims`,
    defaultMessage: 'PersistentVolumeClaims',
  },
  leftMenuConfigMaps: {
    id: `${scope}.leftMenuConfigMaps`,
    defaultMessage: 'ConfigMaps',
  },
  leftMenuSecrets: {
    id: `${scope}.leftMenuSecrets`,
    defaultMessage: 'Secrets',
  },
  leftMenuSystemManagement: {
    id: `${scope}.leftMenuSystemManagement`,
    defaultMessage: 'SystemManagement',
  },
  leftMenuServiceLink: {
    id: `${scope}.leftMenuServiceLink`,
    defaultMessage: 'ServiceLink',
  },
  leftMenuServiceMesh: {
    id: `${scope}.leftMenuServiceMesh`,
    defaultMessage: 'ServiceMesh',
  },
  leftMenuServiceMeshTap: {
    id: `${scope}.leftMenuServiceMeshTap`,
    defaultMessage: 'ServiceMeshTap',
  },
  leftMenuStorages: {
    id: `${scope}.leftMenuStorages`,
    defaultMessage: 'Storages',
  },
  leftMenuNetwork: {
    id: `${scope}.leftMenuNetwork`,
    defaultMessage: 'Network',
  },
  leftMenuImageRegistry: {
    id: `${scope}.leftMenuImageRegistry`,
    defaultMessage: 'ImageRegistry',
  },
  leftMenuClusterWatch: {
    id: `${scope}.leftMenuClusterWatch`,
    defaultMessage: 'ClusterWatch',
  },
  leftMenuLogAnalysis: {
    id: `${scope}.leftMenuLogAnalysis`,
    defaultMessage: 'LogAnalysis',
  },
  leftMenuSystemTools: {
    id: `${scope}.leftMenuSystemTools`,
    defaultMessage: 'SystemTools',
  },
  leftMenuAppConfiguration: {
    id: `${scope}.leftMenuAppConfiguration`,
    defaultMessage: 'AppConfiguration',
  },
  leftMenuBasicResources: {
    id: `${scope}.leftMenuBasicResources`,
    defaultMessage: 'BasicResources',
  },
  leftMenuApplicationStore: {
    id: `${scope}.leftMenuApplicationStore`,
    defaultMessage: 'ApplicationStore',
  },
  leftMenuApplications: {
    id: `${scope}.leftMenuApplications`,
    defaultMessage: 'Applications',
  },
  leftMenuContinuousIntegration: {
    id: `${scope}.leftMenuContinuousIntegration`,
    defaultMessage: 'ContinuousIntegration',
  },
  leftMenuAppStore: {
    id: `${scope}.leftMenuAppStore`,
    defaultMessage: 'AppStore',
  },
  leftMenuSystemCharts: {
    id: `${scope}.leftMenuSystemCharts`,
    defaultMessage: 'SystemCharts',
  },
  leftMenuUserCharts: {
    id: `${scope}.leftMenuUserCharts`,
    defaultMessage: 'UserCharts',
  },
  leftMenuClusterList: {
    id: `${scope}.leftMenuClusterList`,
    defaultMessage: 'ClusterList',
  },
  leftMenuGlobalConfig: {
    id: `${scope}.leftMenuGlobalConfig`,
    defaultMessage: 'GlobalConfig',
  },
  leftMenuClusterOverview: {
    id: `${scope}.leftMenuClusterOverview`,
    defaultMessage: 'ClusterOverview',
  },
  // leftMenuContainerManagement: {
  //   id: `${scope}.leftMenuContainerManagement`,
  //   defaultMessage: 'ContainerManagement',
  // },
  // leftMenuContainerWatch: {
  //   id: `${scope}.leftMenuContainerWatch`,
  //   defaultMessage: 'ContainerWatch',
  // },
  // leftMenuImageManagement: {
  //   id: `${scope}.leftMenuImageManagement`,
  //   defaultMessage: 'ImageManagement',
  // },
  leftMenuServices: {
    id: `${scope}.leftMenuServices`,
    defaultMessage: 'Services',
  },
  leftMenuIngresses: {
    id: `${scope}.leftMenuIngresses`,
    defaultMessage: 'Ingresses',
  },
  leftMenuUdpIngresses: {
    id: `${scope}.leftMenuUdpIngresses`,
    defaultMessage: 'UdpIngresses',
  },
  leftMenuApplicationManagement: {
    id: `${scope}.leftMenuApplicationManagement`,
    defaultMessage: 'AppManagement',
  },
  leftMenuDialogTitle: {
    id: `${scope}.leftMenuDialogTitle`,
    defaultMessage: 'Dialog Title',
  },
  leftMenuDialogContent: {
    id: `${scope}.leftMenuDialogContent`,
    defaultMessage: 'Whether installation is required',
  },
  leftMenuDialogButtonInstall: {
    id: `${scope}.leftMenuDialogButtonInstall`,
    defaultMessage: 'Install',
  },
  leftMenuDialogFormUser: {
    id: `${scope}.leftMenuDialogFormUser`,
    defaultMessage: 'User:',
  },
  leftMenuDialogFormIngressDomain: {
    id: `${scope}.leftMenuDialogFormIngressDomain`,
    defaultMessage: 'IngressDomain:',
  },
  leftMenuDialogFormStorageSize: {
    id: `${scope}.leftMenuDialogFormStorageSize`,
    defaultMessage: 'StorageSize:',
  },
  leftMenuDialogFormStorageClass: {
    id: `${scope}.leftMenuDialogFormStorageClass`,
    defaultMessage: 'StorageClass',
  },
  leftMenuAuditLogs: {
    id: `${scope}.leftMenuAuditLogs`,
    defaultMessage: 'AuditLogs',
  },
  leftMenuWorkFlows: {
    id: `${scope}.leftMenuWorkFlows`,
    defaultMessage: 'WorkFlows',
  },
});
