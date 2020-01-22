/**
 *
 * Asynchronously loads the component for SvcMeshWorkloadsPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "SvcMeshWorkloadsPage" */ './index')
);

export const ShowSvcMeshWorkloadPage = loadable(() =>
  import(/* webpackChunkName: "ShowSvcMeshWorkloadPage" */ './ShowItemPage')
);
