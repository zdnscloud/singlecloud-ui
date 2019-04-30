/**
 *
 * Asynchronously loads the component for PodsPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "PodsPage" */ './index')
);

export const CreatePodPage = loadable(() =>
  import(/* webpackChunkName: "CreatePodPage" */ './CreatePodPage')
);

export const PodDetailPage = loadable(() =>
  import(/* webpackChunkName: "PodDetailPage" */ './PodDetailPage')
);
