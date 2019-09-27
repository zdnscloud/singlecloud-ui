/**
 *
 * Asynchronously loads the component for DaemonSetsPage
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "DaemonSetsPage" */ './index')
);

export const CreateDaemonSetPage = loadable(() =>
  import(/* webpackChunkName: "CreateDaemonSetPage" */ './CreatePage')
);

export const DaemonSetDetailPage = loadable(() =>
  import(/* webpackChunkName: "DaemonSetDetailPage" */ './ShowItemPage')
);
