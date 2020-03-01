/**
 *
 * Asynchronously loads the component for CicdsPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() => import(/* webpackChunkName: "CicdsPage" */'./index'));

export const CreateCicdPage = loadable(() => import(/* webpackChunkName: "CreateCicdPage" */'./CreatePage'));

export const UpdateCicdPage = loadable(() => import(/* webpackChunkName: "UpdateCicdPage" */'./UpdatePage'));

export const ShowCicdPage = loadable(() => import(/* webpackChunkName: "ShowCicdPage" */'./ShowItemPage'));

