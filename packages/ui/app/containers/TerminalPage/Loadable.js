/**
 *
 * Asynchronously loads the component for TerminalPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "TerminalPage" */ './index'),
);
