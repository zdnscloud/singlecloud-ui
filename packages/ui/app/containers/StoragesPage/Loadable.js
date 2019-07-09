/**
 *
 * Asynchronously loads the component for StoragePage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "StoragePage" */ './index')
);

export const CreateStoragePage = loadable(() => (
  import(/* webpackChunkName: "CreateStoragePage" */ './CreateStoragePage')
));
