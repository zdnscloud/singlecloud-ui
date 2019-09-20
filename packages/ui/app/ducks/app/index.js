/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  lastNamespace: '',
  showEvents: false,
  showMenuText: true,
});

function appReducer(state = initialState, { type, payload }) {
  switch (type) {
    case c.TOGGLE_EVENTS_VIEW:
      return state.set('showEvents', payload.showEvents);

    case c.TOGGLE_MENU_TEXT:
      return state.set('showMenuText', payload);

    case c.SET_LAST_NAMESPACE:
      return state.set('lastNamespace', payload);

    default:
      return state;
  }
}

export default appReducer;
