/*
 *
 * App actions
 *
 */

import { INIT_ACTION, CHANGE_CLUSTER } from './constants';

export const initAction = () => ({
  type: INIT_ACTION,
  payload: {},
});

export const changeCluster = (cluster) => ({
  type: CHANGE_CLUSTER,
  payload: { cluster },
});
