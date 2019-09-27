/**
 *
 * Asynchronously loads the component for EventsPage
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "EventsPage" */ './index')
);
