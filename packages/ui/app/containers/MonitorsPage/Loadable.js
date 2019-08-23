/**
 *
 * Asynchronously loads the component for Monitors
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "Monitors" */ './index')
);

