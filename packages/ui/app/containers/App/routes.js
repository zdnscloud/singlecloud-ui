// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import LocationOn from '@material-ui/icons/LocationOn';
import Notifications from '@material-ui/icons/Notifications';
import Unarchive from '@material-ui/icons/Unarchive';
import Language from '@material-ui/icons/Language';

import HomePage from 'containers/HomePage/Loadable';
import ClustersPage from 'containers/ClustersPage/Loadable';
import ClusterDetailPage from 'containers/ClusterDetailPage/Loadable';
import NodesPage from 'containers/NodesPage/Loadable';
import NamespacesPage from 'containers/NamespacesPage/Loadable';
import DeploymentsPage from 'containers/DeploymentsPage/Loadable';
import CreateDeployment from 'containers/DeploymentsPage/CreateLoadable';
import PodsPage from 'containers/PodsPage/Loadable';
import TerminalPage from 'containers/TerminalPage/Loadable';
import EventsPage from 'containers/EventsPage/Loadable';
import ConfigMapsPage from 'containers/ConfigMapsPage/Loadable';
import ServicesPage from 'containers/ServicesPage/Loadable';
import IngressesPage from 'containers/IngressesPage/Loadable';
import CreateConfigMap from 'containers/ConfigMapsPage/CreateLoadable';
import ApplicationsPage from 'containers/ApplicationsPage/Loadable';
import CreateApplication from 'containers/ApplicationsPage/CreateLoadable';

const appRoutes = [
  {
    path: '/clusters',
    name: 'Clusters',
    icon: Dashboard,
    component: ClustersPage,
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
    path: '/clusters/:cluster_id/namespaces/:namespace_id/deployments',
    name: 'deployments',
    icon: Dashboard,
    component: DeploymentsPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/deployments/create',
    name: 'create deployments',
    icon: Dashboard,
    component: CreateDeployment,
  },
  {
    path:
      '/clusters/:cluster_id/namespaces/:namespace_id/deployments/:deployment_id/pods',
    name: 'pods',
    icon: Dashboard,
    component: PodsPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/configmaps',
    name: 'configmap',
    icon: Dashboard,
    component: ConfigMapsPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/services',
    name: 'services',
    icon: Dashboard,
    component: ServicesPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/ingresses',
    name: 'ingresses',
    icon: Dashboard,
    component: IngressesPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/configmaps/create',
    name: 'create configmap',
    icon: Dashboard,
    component: CreateConfigMap,
  },
  {
    path: '/clusters/:cluster_id/applications',
    name: 'Applications',
    icon: Dashboard,
    component: ApplicationsPage,
  },
  {
    path: '/clusters/:cluster_id/namespaces/:namespace_id/applications',
    name: 'Applications',
    icon: Dashboard,
    component: ApplicationsPage,
  },
  {
    path: '/clusters/:cluster_id/applications/create',
    name: 'Create Application',
    icon: Dashboard,
    component: CreateApplication,
  },
];

export default appRoutes;
