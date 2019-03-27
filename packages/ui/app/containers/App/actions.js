/*
 *
 * App actions
 *
 */

import { INIT_ACTION, CHANGE_CLUSTER } from './constants';

export const initAction = ({ params }) => ({
  type: INIT_ACTION,
  payload: { ...params },
});

export const changeCluster = (cluster) => ({
  type: CHANGE_CLUSTER,
  payload: { cluster },
});
