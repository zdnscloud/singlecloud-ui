/**
 *
 * Asynchronously loads the component for IngressesPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "IngressesPage" */ './index'),
);
