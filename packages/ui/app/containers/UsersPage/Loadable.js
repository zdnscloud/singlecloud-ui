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
