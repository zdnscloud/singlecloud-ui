/**
 *
 * Asynchronously loads the component for UdpIngresses
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "UdpIngressesPage" */ './index')
);

export const CreateUdpIngressPage = loadable(() =>
  import(/* webpackChunkName: "CreateUdpIngressPage" */ './CreatePage')
);

export const ShowUdpIngressPage = loadable(() =>
  import(/* webpackChunkName: "ShowUdpIngressPage" */ './ShowItemPage')
);
