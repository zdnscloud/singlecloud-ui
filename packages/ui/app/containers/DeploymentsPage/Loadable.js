/**
 *
 * Asynchronously loads the component for DeploymentsPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "DeploymentsPage" */ './index')
);
