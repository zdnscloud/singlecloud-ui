/**
 *
 * Asynchronously loads the component for LoginPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "LoginPage" */ './index')
);
