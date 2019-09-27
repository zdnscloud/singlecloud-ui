/**
 *
 * Asynchronously loads the component for StoragePage
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "StoragePage" */ './index')
);

export const CreateStoragePage = loadable(() =>
  import(/* webpackChunkName: "CreateStoragePage" */ './CreatePage')
);

export const EditStoragePage = loadable(() =>
  import(/* webpackChunkName: "EditStoragePage" */ './EditPage')
);

export const StorageDetailPage = loadable(() =>
  import(/* webpackChunkName: "StorageDetailPage" */ './ShowItemPage')
);
