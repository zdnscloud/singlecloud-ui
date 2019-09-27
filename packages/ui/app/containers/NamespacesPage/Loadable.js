/**
 *
 * Asynchronously loads the component for NamespacesPage
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "NamespacesPage" */ './index')
);

export const CreateNamespacePage = loadable(() =>
  import(/* webpackChunkName: "CreateNamespacePage" */ './CreateNamespacePage')
);

export const NamespaceDetailPage = loadable(() =>
  import(/* webpackChunkName: "NamespaceDetailPage" */ './NamespaceDetailPage')
);
