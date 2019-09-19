/**
 *
 * Asynchronously loads the component for NodesPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "NodesPage" */ './index')
);

export const NodeDetailPage = loadable(() =>
  import(/* webpackChunkName: "NodeDetailPage" */ './ShowItemPage')
);
