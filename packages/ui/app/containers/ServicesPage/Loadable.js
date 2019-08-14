/**
 *
 * Asynchronously loads the component for ServicesPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "ServicesPage" */ './index')
);
