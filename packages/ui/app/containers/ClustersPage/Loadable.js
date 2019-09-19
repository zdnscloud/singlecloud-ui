/**
 *
 * Asynchronously loads the component for ClustersPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "ClustersPage" */ './index')
);

export const CreateClusterPage = loadable(() =>
  import(/* webpackChunkName: "CreateClusterPage" */ './CreatePage')
);
