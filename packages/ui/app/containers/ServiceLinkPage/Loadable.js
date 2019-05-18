/**
 *
 * Asynchronously loads the component for ServiceLinkPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "ServiceLinkPage" */ './index')
);
