/**
 *
 * Asynchronously loads the component for ApplicationsPage
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "ApplicationsPage" */ './index')
);

export const ApplicationDetailPage = loadable(() =>
  import(
    /* webpackChunkName: "ApplicationDetailPage" */ './ApplicationDetailPage'
  )
);

export const CreateApplicationPage = loadable(() =>
  import(
    /* webpackChunkName: "CreateApplicationPage" */ './CreateApplicationPage'
  )
);
