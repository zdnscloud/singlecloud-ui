/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineEpics } from 'redux-observable';

import eventsPageEpic from 'containers/EventsPage/epic';
import roleEpic from 'ducks/role/epic';
import usersEpic from 'ducks/users/epic';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createEpic(injectedEpics = {}) {
  const rootEpic = combineEpics(eventsPageEpic, roleEpic, usersEpic);

  return rootEpic;
}
