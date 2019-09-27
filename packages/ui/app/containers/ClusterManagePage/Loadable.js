/**
 *
 * Asynchronously loads the component for ClusterManagePage
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "ClusterManagePage" */ './index')
);
