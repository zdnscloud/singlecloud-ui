/**
 *
 * Asynchronously loads the component for SvcMeshWorkloadGroupsPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "SvcMeshWorkloadGroupsPage" */ './index')
);
