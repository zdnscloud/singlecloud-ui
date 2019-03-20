/**
 *
 * Asynchronously loads the component for NamespacesPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "NamespacesPage" */ './index')
);
