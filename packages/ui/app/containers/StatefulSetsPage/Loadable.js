/**
 *
 * Asynchronously loads the component for StatefulSetsPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "StatefulSetsPage" */ './index')
);

export const CreateStatefulSetPage = loadable(() =>
  import(/* webpackChunkName: "CreateStatefulSetPage" */ './CreatePage')
);

export const StatefulSetDetailPage = loadable(() =>
  import(/* webpackChunkName: "StatefulSetDetailPage" */ './ShowItemPage')
);
