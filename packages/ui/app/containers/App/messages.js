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
  leftMenuClusterManagement: {
    id: `${scope}.leftMenuClusterManagement`,
    defaultMessage: 'ClusterManagement',
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
  leftMenuDeployments: {
    id: `${scope}.leftMenuDeployments`,
    defaultMessage: 'Deployments',
  },
  leftMenuStatefulSet: {
    id: `${scope}.leftMenuStatefulSet`,
    defaultMessage: 'StatefulSet',
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
  leftMenuStorages: {
    id: `${scope}.leftMenuStorages`,
    defaultMessage: 'Storages',
  },
  leftMenuNetwork: {
    id: `${scope}.leftMenuNetwork`,
    defaultMessage: 'Network',
  },
  leftMenuUserQuotas: {
    id: `${scope}.leftMenuUserQuotas`,
    defaultMessage: 'UserQuotas',
  },
  leftMenuUserQuotasList: {
    id: `${scope}.leftMenuUserQuotasList`,
    defaultMessage: 'UserQuotasList',
  },
  leftMenuImageRegistry: {
    id: `${scope}.leftMenuImageRegistry`,
    defaultMessage: 'ImageRegistry',
  },
  leftMenuClusterWatch: {
    id: `${scope}.leftMenuClusterWatch`,
    defaultMessage: 'ClusterWatch',
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
  leftMenuAppStore: {
    id: `${scope}.leftMenuAppStore`,
    defaultMessage: 'AppStore',
  },
  leftMenuLocalAppTemplates: {
    id: `${scope}.leftMenuLocalAppTemplates`,
    defaultMessage: 'LocalAppTemplates',
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
  leftMenuUdpingresses: {
    id: `${scope}.leftMenuUdpingresses`,
    defaultMessage: 'Udpingresses',
  },
  leftMenuApplicationManagement: {
    id: `${scope}.leftMenuApplicationManagement`,
    defaultMessage: 'AppManagement',
  },
  leftMenusDialogTitle: {
    id: `${scope}.leftMenusDialogTitle`,
    defaultMessage: 'Dialog Title',
  },
  leftMenusDialogContent: {
    id: `${scope}.leftMenusDialogContent`,
    defaultMessage: 'Whether installation is required',
  },
  leftMenusDialogButtonInstall: {
    id: `${scope}.leftMenusDialogButtonInstall`,
    defaultMessage: 'Install',
  },
  leftMenusDialogFormUser: {
    id: `${scope}.leftMenusDialogFormUser`,
    defaultMessage: 'User:',
  },
  leftMenusDialogFormIngressDomain: {
    id: `${scope}.leftMenusDialogFormIngressDomain`,
    defaultMessage: 'IngressDomain:',
  },
  leftMenusDialogFormStorageSize: {
    id: `${scope}.leftMenusDialogFormStorageSize`,
    defaultMessage: 'StorageSize:',
  },
});
