/**
 *
 * Asynchronously loads the component for UserQuotasPage
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "UserQuotasPage" */ './index')
);

export const CreateUserQuotaPage = loadable(() =>
  import(/* webpackChunkName: "CreateUserQuotaPage" */ './CreateUserQuotaPage')
);

export const EditUserQuotaPage = loadable(() =>
  import(/* webpackChunkName: "EditUserQuotaPage" */ './EditUserQuotaPage')
);

export const UserQuotaDetailPage = loadable(() =>
  import(/* webpackChunkName: "UserQuotaDetailPage" */ './UserQuotaDetailPage')
);

export const RequestUserQuotaPage = loadable(() =>
  import(
    /* webpackChunkName: "RequestUserQuotaPage" */ './RequestUserQuotaPage'
  )
);

export const AdminUserQuotaPage = loadable(() =>
  import(/* webpackChunkName: "AdminUserQuotaPage" */ './AdminUserQuotaPage')
);
