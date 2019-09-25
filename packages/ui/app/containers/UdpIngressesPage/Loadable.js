/**
 *
 * Asynchronously loads the component for UdpIngresses
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "UdpIngressesPage" */ './index')
);

export const CreateUdpIngressPage = loadable(() =>
  import(/* webpackChunkName: "CreateUdpIngressPage" */ './CreatePage')
);

export const ShowUdpIngressPage = loadable(() =>
  import(/* webpackChunkName: "ShowUdpIngressPage" */ './ShowItemPage')
);
