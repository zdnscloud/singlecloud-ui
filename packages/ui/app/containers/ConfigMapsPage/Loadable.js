/**
 *
 * Asynchronously loads the component for ConfigMapsPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "ConfigMapsPage" */ './index')
);

export const CreateConfigMapPage = loadable(() =>
  import(/* webpackChunkName: "CreateConfigMapPage" */ './CreateConfigMapPage')
);
