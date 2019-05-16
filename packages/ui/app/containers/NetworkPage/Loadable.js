/**
 *
 * Asynchronously loads the component for NetworkPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "NetworkPage" */ './index')
);
