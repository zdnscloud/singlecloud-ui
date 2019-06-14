/*
 *
 * App actions
 *
 */

import * as c from './constants';

export const initAction = () => ({
  type: c.INIT_ACTION,
  payload: {},
});

export const changeCluster = (clusterID) => ({
  type: c.CHANGE_CLUSTER,
  payload: { clusterID },
});

export const toggleEventsView = (showEvents) => ({
  type: c.TOGGLE_EVENTS_VIEW,
  payload: { showEvents },
});

export const toggleMenuText = (show) => ({
  type: c.TOGGLE_MENU_TEXT,
  payload: show,
});
