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

export const setEvents = (events, clusterID) => ({
  type: c.SET_EVENTS,
  payload: { events },
  meta: { clusterID },
});

export const eventConnectionError = (error, clusterID) => ({
  type: c.EVNET_CONNECTION_ERROR,
  payload: error,
  error: true,
  meta: { clusterID },
});
