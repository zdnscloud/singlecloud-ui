/**
 *
 * Asynchronously loads the component for LoginPage
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "LoginPage" */ './index')
);
