/**
 *
 * Asynchronously loads the component for ClustersPage
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "ClustersPage" */ './index')
);

export const CreateClusterPage = loadable(() =>
  import(/* webpackChunkName: "CreateClusterPage" */ './CreatePage')
);
