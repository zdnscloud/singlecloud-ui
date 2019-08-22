/**
 *
 * Asynchronously loads the component for Udpingresses
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "UdpingressesPage" */ './index')
);

export const CreateUdpingressPage = loadable(() =>
  import(/* webpackChunkName: "CreateUdpingressPage" */ './CreatePage')
);

export const ShowUdpingressPage = loadable(() =>
  import(/* webpackChunkName: "ShowUdpingressPage" */ './ShowItemPage')
);
