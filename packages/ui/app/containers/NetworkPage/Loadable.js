/**
 *
 * Asynchronously loads the component for NetworkPage
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "NetworkPage" */ './index')
);
