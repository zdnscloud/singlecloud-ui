/**
 *
 * Asynchronously loads the component for DeploymentsPage
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "DeploymentsPage" */ './index')
);

export const CreateDeploymentPage = loadable(() =>
  import(/* webpackChunkName: "CreateDeploymentPage" */ './CreatePage')
);

export const DeploymentDetailPage = loadable(() =>
  import(/* webpackChunkName: "DeploymentDetailPage" */ './ShowItemPage')
);
