/**
 *
 * Asynchronously loads the component for SvcMeshTapPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "SvcMeshTapPage" */ './index')
);
