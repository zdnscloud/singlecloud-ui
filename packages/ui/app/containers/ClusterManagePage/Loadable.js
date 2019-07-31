/**
 *
 * Asynchronously loads the component for ClustersPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "ClusterManagePage" */ './index')
);

