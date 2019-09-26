/**
 * Duck: BlockDevices
 * actions: blockDevices
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadBlockDevices = (url, meta = {}) => ({
  type: c.LOAD_BLOCK_DEVICES,
  payload: url,
  meta,
});

export const loadBlockDevicesSuccess = (resp, meta = {}) => ({
  type: c.LOAD_BLOCK_DEVICES_SUCCESS,
  payload: resp,
  meta,
});

export const loadBlockDevicesFailure = (error, meta = {}) => ({
  type: c.LOAD_BLOCK_DEVICES_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
