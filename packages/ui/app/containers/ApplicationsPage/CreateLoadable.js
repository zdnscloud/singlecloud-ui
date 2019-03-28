/**
 *
 * Asynchronously loads the component for CreateDeployment
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "CreateDeploymentPage" */ './CreateDeployment')
);
