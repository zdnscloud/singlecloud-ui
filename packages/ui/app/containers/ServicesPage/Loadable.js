/**
 *
 * Asynchronously loads the component for ServicesPage
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "ServicesPage" */ './index')
);

export const CreateServicePage = loadable(() =>
  import(/* webpackChunkName: "CreateServicePage" */ './CreatePage')
);

export const ShowServicePage = loadable(() =>
  import(/* webpackChunkName: "ShowServicePage" */ './ShowItemPage')
);
