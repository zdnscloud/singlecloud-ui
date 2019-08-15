/**
 *
 * Asynchronously loads the component for IngressesPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "IngressesPage" */ './index')
);

export const CreateIngressPage = loadable(() =>
  import(/* webpackChunkName: "CreateIngressPage" */ './CreatePage')
);

export const UpdateIngressPage = loadable(() =>
  import(/* webpackChunkName: "UpdateIngressPage" */ './UpdatePage')
);

export const ShowIngressPage = loadable(() =>
  import(/* webpackChunkName: "ShowIngressPage" */ './ShowItemPage')
);
