/**
 *
 * Asynchronously loads the component for TopologyPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "TopologyPage" */ './index')
);
