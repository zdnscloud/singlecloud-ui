/**
 *
 * Asynchronously loads the component for CreateApplication
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "CreateApplicationPage" */ './CreateApplication')
);
