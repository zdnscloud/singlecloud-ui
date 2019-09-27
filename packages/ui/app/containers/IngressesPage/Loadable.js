/**
 *
 * Asynchronously loads the component for Ingress
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "IngressesPage" */ './index')
);

export const CreateIngressPage = loadable(() =>
  import(/* webpackChunkName: "CreateIngressPage" */ './CreatePage')
);

export const ShowIngressPage = loadable(() =>
  import(/* webpackChunkName: "ShowIngressPage" */ './ShowItemPage')
);
