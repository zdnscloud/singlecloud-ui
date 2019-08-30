/**
 *
 * Asynchronously loads the component for GlobalConfig
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "RegistriesPage" */ './index')
);
