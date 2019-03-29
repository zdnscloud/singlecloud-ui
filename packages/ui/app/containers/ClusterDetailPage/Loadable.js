/**
 *
 * Asynchronously loads the component for ClusterDetailPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "ClusterDetailPage" */ './index')
);
