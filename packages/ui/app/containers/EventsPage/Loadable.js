/**
 *
 * Asynchronously loads the component for EventsPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "EventsPage" */ './index')
);
