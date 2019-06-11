/*
 *
 * Events actions
 *
 */

import * as c from './constants';

export const openCluster = (clusterID) => ({
  type: c.OPEN_CLUSTER,
  payload: { clusterID },
});

export const closeCluster = () => ({
  type: c.CLOSE_CLUSTER,
  payload: {},
});

export const addEvent = (event, clusterID) => ({
  type: c.ADD_EVENT,
  payload: { event },
  meta: { clusterID },
});

export const setEvents = (events, clusterID) => ({
  type: c.SET_EVENTS,
  payload: { events },
  meta: { clusterID },
});
