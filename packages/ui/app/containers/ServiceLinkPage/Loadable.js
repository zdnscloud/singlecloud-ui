/**
 *
 * Asynchronously loads the component for ServiceLinkPage
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "ServiceLinkPage" */ './index')
);
