/**
 *
 * Asynchronously loads the component for ServiceMeshPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "ServiceMeshPage" */ './index')
);

export const WorkloadDetailPage = loadable(() =>
  import(/* webpackChunkName: "WorkloadDetailPage" */ './WorkloadDetailPage')
);

export const PodDetailPage = loadable(() =>
  import(/* webpackChunkName: "PodDetailPage" */ './PodDetailPage')
);
