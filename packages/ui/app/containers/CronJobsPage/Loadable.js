/**
 *
 * Asynchronously loads the component for CronJobsPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "CronJobsPage" */ './index')
);

export const CreateCronJobPage = loadable(() =>
  import(/* webpackChunkName: "CreateCronJobPage" */ './CreatePage')
);

export const CronJobDetailPage = loadable(() =>
  import(/* webpackChunkName: "CronJobDetailPage" */ './ShowItemPage')
);
