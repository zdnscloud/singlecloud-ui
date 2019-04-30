/**
 *
 * Asynchronously loads the component for DeploymentsPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "DeploymentsPage" */ './index')
);

export const CreateDeploymentPage = loadable(() =>
  import(/* webpackChunkName: "CreateDeploymentPage" */ './CreateDeploymentPage')
);

export const DeploymentDetailPage = loadable(() =>
  import(/* webpackChunkName: "DeploymentDetailPage" */ './DeploymentDetailPage')
);
