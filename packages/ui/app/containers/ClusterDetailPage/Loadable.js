/**
 *
 * Asynchronously loads the component for ClusterDetailPage
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "ClusterDetailPage" */ './index')
);

export const ClusterThresholdsPage = loadable(() =>
  import(
    /* webpackChunkName: "ClusterThresholdsPage" */ './ClusterThresholdsPage'
  )
);
