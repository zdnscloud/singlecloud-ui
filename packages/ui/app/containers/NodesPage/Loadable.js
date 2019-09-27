/**
 *
 * Asynchronously loads the component for NodesPage
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "NodesPage" */ './index')
);

export const NodeDetailPage = loadable(() =>
  import(/* webpackChunkName: "NodeDetailPage" */ './ShowItemPage')
);
