/**
 *
 * Asynchronously loads the component for WorkFlowsPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() => import(/* webpackChunkName: "WorkFlowsPage" */'./index'));

export const CreateWorkFlowPage = loadable(() => import(/* webpackChunkName: "CreateWorkFlowPage" */'./CreatePage'));

export const UpdateWorkFlowPage = loadable(() => import(/* webpackChunkName: "UpdateWorkFlowPage" */'./UpdatePage'));

export const ShowWorkFlowPage = loadable(() => import(/* webpackChunkName: "ShowWorkFlowPage" */'./ShowItemPage'));

export const LogsPage = loadable(() => import(/* webpackChunkName: "ShowWorkFlowPage" */'./LogsPage'));

