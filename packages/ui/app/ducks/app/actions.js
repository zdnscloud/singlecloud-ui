/*
 *
 * App actions
 *
 */

import * as c from './constants';

export const toggleEventsView = (showEvents) => ({
  type: c.TOGGLE_EVENTS_VIEW,
  payload: { showEvents },
});

export const toggleMenuText = (show) => ({
  type: c.TOGGLE_MENU_TEXT,
  payload: show,
});

export const setLastNamespace = (ns) => ({
  type: c.SET_LAST_NAMESPACE,
  payload: ns,
});
