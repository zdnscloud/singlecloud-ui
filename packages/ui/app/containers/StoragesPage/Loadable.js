/**
 *
 * Asynchronously loads the component for StoragePage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "StoragePage" */ './index')
);

export const CreateStoragePage = loadable(() =>
  import(/* webpackChunkName: "CreateStoragePage" */ './CreateStoragePage')
);

export const EditStoragePage = loadable(() =>
  import(/* webpackChunkName: "EditStoragePage" */ './EditStoragePage')
);

export const StorageDetailPage = loadable(() =>
  import(/* webpackChunkName: "StorageDetailPage" */ './StorageDetailPage')
);
