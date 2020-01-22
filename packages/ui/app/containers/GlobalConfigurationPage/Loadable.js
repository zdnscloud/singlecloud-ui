/**
 *
 * Asynchronously loads the component for GlobalConfigurationPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "GlobalConfigurationPage" */ './index')
);
