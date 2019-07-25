/* eslint-disable import/named */
// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import LocationOn from '@material-ui/icons/LocationOn';
import Notifications from '@material-ui/icons/Notifications';
import Unarchive from '@material-ui/icons/Unarchive';
import Language from '@material-ui/icons/Language';

import ClustersPage, {
  CreateClusterPage,
} from 'containers/ClustersPage/Loadable';
import ClusterDetailPage from 'containers/ClusterDetailPage/Loadable';
import NodesPage, {
  NodeDetailPage,
  CreateNodePage,
} from 'containers/NodesPage/Loadable';
import NamespacesPage, {
  CreateNamespacePage,
  NamespaceDetailPage,
  EditNamespacePage,
} from 'containers/NamespacesPage/Loadable';
import TerminalPage from 'containers/TerminalPage/Loadable';
import EventsPage from 'containers/EventsPage/Loadable';
import DeploymentsPage, {
  CreateDeploymentPage,
  DeploymentDetailPage,
} from 'containers/DeploymentsPage/Loadable';
import StatefulSetsPage, {
  CreateStatefulSetPage,
  StatefulSetDetailPage,
} from 'containers/StatefulSetsPage/Loadable';
import DaemonSetsPage, {
  CreateDaemonSetPage,
  DaemonSetDetailPage,
} from 'containers/DaemonSetsPage/Loadable';
import CronJobsPage, {
  CreateCronJobPage,
  CronJobDetailPage,
} from 'containers/CronJobsPage/Loadable';
import JobsPage, {
  CreateJobPage,
  JobDetailPage,
} from 'containers/JobsPage/Loadable';
import ConfigMapsPage, {
  CreateConfigMapPage,
  ShowConfigMapPage,
  EditConfigMapPage,
} from 'containers/ConfigMapsPage/Loadable';
import SecretsPage, {
  CreateSecretPage,
  ShowSecretPage,
  EditSecretPage
} from 'containers/SecretsPage/Loadable';
import ServiceLinkPage from 'containers/ServiceLinkPage/Loadable';
import StoragesPage, {
  CreateStoragePage,
  EditStoragePage,
  StorageDetailPage,
} from 'containers/StoragesPage/Loadable';
import NetworkPage from 'containers/NetworkPage/Loadable';
import UserQuotasPage, {
  CreateUserQuotaPage,
  UserQuotaDetailPage,
  RequestUserQuotaPage,
  AdminUserQuotaPage,
  EditUserQuotaPage,
} from 'containers/UserQuotasPage/Loadable';
// UserQuotasPage

import UsersPage, {
  CreateUserPage,
  EditUserPage,
  UserProfilePage,
  PasswordSetupPage,
} from 'containers/UsersPage/Loadable';

const appRoutes = [
  {
    path: '/clusters',
    name: 'Clusters',
    icon: Dashboard,
    component: ClustersPage,
  },
  {
    path: '/clusters/create',
    name: 'Cluster create',
    icon: Dashboard,
    component: CreateClusterPage,
  },
  {
    path: '/clusters/:cluster_id',
    name: 'Cluster Detail',
    icon: Dashboard,
    component: ClusterDetailPage,
  },
  {
    path: '/clusters/:cluster_id/nodes',
    name: 'Nodes',
    icon: Dashboard,
    component: NodesPage,
  },
  {
    path: '/clusters/:cluster_id/nodes/create',
    name: 'CreateNode',
    icon: Dashboard,
    component: CreateNodePage,
  },
  {
    path: '/clusters/:cluster_id/nodes/:node_id/show',
    name: 'NodeDetail',
    icon: Dashboard,
    component: NodeDetailPage,
  },
  {
    path: '/clusters/:cluster_id/console',
    name: 'console',
    icon: Dashboard,
    component: TerminalPage,
  },
  {
    path: '/clusters/:cluster_id/events',
    name: 'events',
    icon: Dashboard,
    component: EventsPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces',
    name: 'namespaces',
    icon: Dashboard,
    component: NamespacesPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/create',
    name: 'namespaces',
    icon: Dashboard,
    component: CreateNamespacePage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/show',
    name: 'namespaces',
    icon: Dashboard,
    component: NamespaceDetailPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/edit',
    name: 'namespaces',
    icon: Dashboard,
    component: EditNamespacePage,
  },
  // configmap
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/configmaps',
    name: 'configmap',
    icon: Dashboard,
    component: ConfigMapsPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/configmaps/create',
    name: 'create configmap',
    icon: Dashboard,
    component: CreateConfigMapPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/configmaps/:configmap_id/edit',
    name: 'edit configmap',
    icon: Dashboard,
    component: EditConfigMapPage,
  },
  {
    path:
      '/clusters/:cluster_id/namespaces/:namespace_id/configmaps/:configmap_id/show',
    name: 'show configmap',
    icon: Dashboard,
    component: ShowConfigMapPage,
  },
  // configmap end
  // secret
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/secrets',
    name: 'secret',
    icon: Dashboard,
    component: SecretsPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/secrets/create',
    name: 'create secret',
    icon: Dashboard,
    component: CreateSecretPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/secrets/:secret_id/edit',
    name: 'edit secret',
    icon: Dashboard,
    component: EditSecretPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/secrets/:secret_id/show',
    name: 'show secret',
    icon: Dashboard,
    component: ShowSecretPage,
  },
  // secret end
  // deployment
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/deployments',
    name: 'Deployments',
    icon: Dashboard,
    component: DeploymentsPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/deployments/create',
    name: 'Create Deployment',
    icon: Dashboard,
    component: CreateDeploymentPage,
  },
  {
    path:
      '/clusters/:cluster_id/namespaces/:namespace_id/deployments/:deployment_id/show',
    name: 'Deployment Detail',
    icon: Dashboard,
    component: DeploymentDetailPage,
  },
  // deployment end
  // statefulset
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/statefulSets',
    name: 'StatefulSets',
    icon: Dashboard,
    component: StatefulSetsPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/statefulSets/create',
    name: 'Create StatefulSet',
    icon: Dashboard,
    component: CreateStatefulSetPage,
  },
  {
    path:
      '/clusters/:cluster_id/namespaces/:namespace_id/statefulSets/:stateful_set_id/show',
    name: 'StatefulSet Detail',
    icon: Dashboard,
    component: StatefulSetDetailPage,
  },
  // statefulset end
  // daemonset
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/daemonSets',
    name: 'DaemonSets',
    icon: Dashboard,
    component: DaemonSetsPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/daemonSets/create',
    name: 'Create DaemonSet',
    icon: Dashboard,
    component: CreateDaemonSetPage,
  },
  {
    path:
      '/clusters/:cluster_id/namespaces/:namespace_id/daemonSets/:daemonset_set_id/show',
    name: 'DaemonSet Detail',
    icon: Dashboard,
    component: DaemonSetDetailPage,
  },
  // daemonset end
  // cronjob
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/cronJobs',
    name: 'CronJobs',
    icon: Dashboard,
    component: CronJobsPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/cronJobs/create',
    name: 'Create CronJob',
    icon: Dashboard,
    component: CreateCronJobPage,
  },
  {
    path:
      '/clusters/:cluster_id/namespaces/:namespace_id/cronJobs/:cron_job_id/show',
    name: 'CronJob Detail',
    icon: Dashboard,
    component: CronJobDetailPage,
  },
  // cronjob end
  // job
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/jobs',
    name: 'Jobs',
    icon: Dashboard,
    component: JobsPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/jobs/create',
    name: 'Create Job',
    icon: Dashboard,
    component: CreateJobPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/jobs/:job_id/show',
    name: 'Job Detail',
    icon: Dashboard,
    component: JobDetailPage,
  },
  // job end
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/serviceLink',
    name: 'ServiceLink',
    icon: Dashboard,
    component: ServiceLinkPage,
  },
  {
    path: '/clusters/:cluster_id/storages',
    name: 'Storage',
    icon: Dashboard,
    component: StoragesPage,
  },
  {
    path: '/clusters/:cluster_id/storages/create',
    name: 'Create Storage',
    icon: Dashboard,
    component: CreateStoragePage,
  },
  {
    path: '/clusters/:cluster_id/storages/:storage_id/edit',
    name: 'Edit Storage',
    icon: Dashboard,
    component: EditStoragePage,
  },
  {
    path: '/clusters/:cluster_id/storages/:storage_id/show',
    name: 'Show Storage Detail',
    icon: Dashboard,
    component: StorageDetailPage,
  },
  {
    path: '/clusters/:cluster_id/network',
    name: 'Network',
    icon: Dashboard,
    component: NetworkPage,
  },
  {
    path: '/users',
    name: 'users',
    icon: Dashboard,
    component: UsersPage,
  },
  {
    path: '/users/create',
    name: 'Create User',
    icon: Dashboard,
    component: CreateUserPage,
  },
  {
    path: '/users/:user_id/edit',
    name: 'Edit User',
    icon: Dashboard,
    component: EditUserPage,
  },
  {
    path: '/users/:user_id/profile',
    name: 'User Profile',
    icon: Dashboard,
    component: UserProfilePage,
  },
  {
    path: '/users/:user_id/passwd',
    name: 'Password Setup',
    icon: Dashboard,
    component: PasswordSetupPage,
  },
  {
    path: '/userQuotas',
    name: 'User Quotas',
    icon: Dashboard,
    component: UserQuotasPage,
  },
  {
    path: '/adminUserQuotas',
    name: 'User Quotas',
    icon: Dashboard,
    component: AdminUserQuotaPage,
  },
  // userQuotas
  {
    path: '/userQuotas/create',
    name: 'Create UserQuota',
    icon: Dashboard,
    component: CreateUserQuotaPage,
  },
  {
    path: '/userQuotas/:userQuota_id',
    name: 'UserQuota Detail',
    icon: Dashboard,
    component: UserQuotaDetailPage,
  },
  {
    path: '/userQuotas/:userQuota_id/request',
    name: 'UserQuota Request',
    icon: Dashboard,
    component: RequestUserQuotaPage,
  },
  {
    path: '/userQuotas/:userQuota_id/edit',
    name: 'UserQuota Edit',
    icon: Dashboard,
    component: EditUserQuotaPage,
  },
  // userQuotas end
];

export default appRoutes;
