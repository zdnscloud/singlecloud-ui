/**
 *
 * Asynchronously loads the component for UserQuotasPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "UserQuotasPage" */ './index')
);
