/**
 *
 * Asynchronously loads the component for ClustersPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "ClustersPage" */ './index')
);

export const CreateClustersPage = loadable(() =>
  import(/* webpackChunkName: "CreateClustersPage" */ './CreateClustersPage')
);