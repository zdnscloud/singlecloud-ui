/**
 *
 * Asynchronously loads the component for Registries
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "RegistriesPage" */ './index')
);

export const UpdateRegistryPage = loadable(() =>
  import(/* webpackChunkName: "UpdateRegistryPage" */ './UpdatePage')
);

