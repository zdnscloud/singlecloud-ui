/**
 *
 * Asynchronously loads the component for AlarmMessagesPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "AlarmMessagesPage" */ './index')
);
