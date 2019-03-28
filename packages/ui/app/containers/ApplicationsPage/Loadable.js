/**
 *
 * Asynchronously loads the component for ApplicationsPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "ApplicationsPage" */ './index')
);
