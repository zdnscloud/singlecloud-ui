/**
 *
 * Asynchronously loads the component for ClustersPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "ClusterManagePage" */ './index')
);
export const CreateNodePage = loadable(() =>
  import(/* webpackChunkName: "CreateNodePage" */ './CreateNodePage')
);

