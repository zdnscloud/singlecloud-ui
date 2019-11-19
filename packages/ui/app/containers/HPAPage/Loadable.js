/**
 *
 * Asynchronously loads the component for HPAPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "HPAPage" */ './index')
);

export const CreateHPAPage = loadable(() =>
  import(/* webpackChunkName: "CreateHPAPage" */ './CreatePage')
);

export const UpdateHPAPage = loadable(() =>
  import(/* webpackChunkName: "UpdateHPAPage" */ './UpdatePage')
);

export const ShowHPAPage = loadable(() =>
  import(/* webpackChunkName: "ShowHPAPage" */ './ShowItemPage')
);
