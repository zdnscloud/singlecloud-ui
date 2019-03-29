/*
 *
 * App actions
 *
 */

import { INIT_ACTION, CHANGE_CLUSTER, TOGGLE_EVENTS_VIEW } from './constants';

export const initAction = () => ({
  type: INIT_ACTION,
  payload: {},
});

export const changeCluster = (cluster) => ({
  type: CHANGE_CLUSTER,
  payload: { cluster },
});

export const toggleEventsView = (showEvents) => ({
  type: TOGGLE_EVENTS_VIEW,
  payload: { showEvents },
});
