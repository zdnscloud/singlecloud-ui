/**
 *
 * Asynchronously loads the component for CreateConfigMap
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "CreateConfigMapPage" */ './CreateConfigMap'),
);
