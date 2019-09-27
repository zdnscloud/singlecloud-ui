/**
 * Asynchronously loads the component for NotFoundPage
 */
import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "NotFoundPage" */ './index')
);
