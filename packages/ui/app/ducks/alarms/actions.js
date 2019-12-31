/**
 * Duck: Alarms
 * actions: alarms
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadAlarms = (url, meta = {}) => ({
  type: c.LOAD_ALARMS,
  payload: url,
  meta,
});

export const loadAlarmsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_ALARMS_SUCCESS,
  payload: resp,
  meta,
});

export const loadAlarmsFailure = (error, meta = {}) => ({
  type: c.LOAD_ALARMS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateAlarm = (data, meta = {}) => ({
  type: c.UPDATE_ALARM,
  payload: data,
  meta,
});

export const updateAlarmSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_ALARM_SUCCESS,
  payload: resp,
  meta,
});

export const updateAlarmFailure = (error, meta = {}) => ({
  type: c.UPDATE_ALARM_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeAlarm = (id, meta = {}) => ({
  type: c.REMOVE_ALARM,
  payload: id,
  meta,
});

export const removeAlarmSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_ALARM_SUCCESS,
  payload: resp,
  meta,
});

export const removeAlarmFailure = (error, meta = {}) => ({
  type: c.REMOVE_ALARM_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const openAlarmChannel = (payload, meta = {}) => ({
  type: c.OPEN_ALARM_CHANNEL,
  payload,
  meta,
});

export const closeAlarmChannel = (payload, meta = {}) => ({
  type: c.CLOSE_ALARM_CHANNEL,
  payload,
  meta,
});

export const alarmConnectionError = (payload, meta = {}) => ({
  type: c.ALARM_CONNECTION_ERROR,
  payload,
  meta,
  error: true,
});

export const setUntrackNumber = (number, meta = {}) => ({
  type: c.SET_UNTRACK_NUMBER,
  payload: number,
  meta,
});

export const newAlarm = (payload, meta = {}) => ({
  type: c.NEW_ALARM,
  payload,
  meta,
});

export const removeNewAlarm = (payload, meta = {}) => ({
  type: c.REMOVE_NEW_ALARM,
  payload,
  meta,
});

export const unknownEvent = (payload, meta = {}) => ({
  type: c.UNKNOWN_EVENT,
  payload,
  meta,
});
