/*
 *
 * App actions
 *
 */

import {
  INIT_ACTION,
  CHANGE_CLUSTER,
  TOGGLE_EVENTS_VIEW,
  TOGGLE_MENU_TEXT,
} from './constants';

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

export const toggleMenuText = (show) => ({
  type: TOGGLE_MENU_TEXT,
  payload: show,
});
