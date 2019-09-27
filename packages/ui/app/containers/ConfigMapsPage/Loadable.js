/**
 *
 * Asynchronously loads the component for ConfigMapsPage
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "ConfigMapsPage" */ './index')
);

export const CreateConfigMapPage = loadable(() =>
  import(/* webpackChunkName: "CreateConfigMapPage" */ './CreateConfigMapPage')
);

export const ShowConfigMapPage = loadable(() =>
  import(/* webpackChunkName: "ShowConfigMapPage" */ './ShowConfigMapPage')
);

export const EditConfigMapPage = loadable(() =>
  import(/* webpackChunkName: "EditConfigMapPage" */ './EditConfigMapPage')
);
