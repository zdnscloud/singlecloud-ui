/**
 *
 * Asynchronously loads the component for UserQuotasPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "UserQuotasPage" */ './index')
);

export const CreateUserQuotaPage = loadable(() =>
  import(
    /* webpackChunkName: "CreateUserQuotaPage" */ './CreateUserQuotaPage'
  )
);

export const UserQuotaDetailPage = loadable(() =>
  import(
    /* webpackChunkName: "UserQuotaDetailPage" */ './UserQuotaDetailPage'
  )
);

export const RequestUserQuotaPage = loadable(() =>
  import(
    /* webpackChunkName: "RequestUserQuotaPage" */ './RequestUserQuotaPage'
  )
);
