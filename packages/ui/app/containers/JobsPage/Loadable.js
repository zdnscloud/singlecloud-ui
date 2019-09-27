/**
 *
 * Asynchronously loads the component for JobsPage
 *
 */

import loadable from '@gsmlg/com/loadable';

export default loadable(() =>
  import(/* webpackChunkName: "JobsPage" */ './index')
);

export const CreateJobPage = loadable(() =>
  import(/* webpackChunkName: "CreateJobPage" */ './CreatePage')
);

export const JobDetailPage = loadable(() =>
  import(/* webpackChunkName: "ShowJobPage" */ './ShowItemPage')
);
