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
  import(
    /* webpackChunkName: "CreateStatefulSetPage" */ './CreateStatefulSetPage'
  )
);

export const StatefulSetDetailPage = loadable(() =>
  import(
    /* webpackChunkName: "StatefulSetDetailPage" */ './StatefulSetDetailPage'
  )
);
