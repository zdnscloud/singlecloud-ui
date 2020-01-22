/**
 *
 * Asynchronously loads the component for SvcMeshPodsPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "SvcMeshPodsPage" */ './index')
);
