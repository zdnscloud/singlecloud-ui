/**
 *
 * Asynchronously loads the component for PodsPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "PodsPage" */ './index')
);
