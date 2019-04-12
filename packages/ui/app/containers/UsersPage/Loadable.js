/**
 *
 * Asynchronously loads the component for UsersPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "UsersPage" */ './index')
);

export const CreateUserPage = loadable(() =>
  import(/* webpackChunkName: "CreateUsersPage" */ './CreateUserPage')
);

export const EditUserPage = loadable(() =>
  import(/* webpackChunkName: "EditUsersPage" */ './EditUserPage')
);

export const UserProfilePage = loadable(() =>
  import(/* webpackChunkName: "UserProfilePage" */ './UserProfilePage')
);

export const PasswordSetupPage = loadable(() =>
  import(/* webpackChunkName: "PasswordSetupPage" */ './PasswordSetupPage')
);
