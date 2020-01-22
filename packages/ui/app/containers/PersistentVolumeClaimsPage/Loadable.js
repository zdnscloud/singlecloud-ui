/**
 *
 * Asynchronously loads the component for PersistentVolumeClaimsPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "PersistentVolumeClaimsPage" */ './index')
);
