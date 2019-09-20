/**
 * Duck: InnerServices
 * actions: innerServices
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadInnerServices = (url, meta = {}) => ({
  type: c.LOAD_INNER_SERVICES,
  payload: url,
  meta,
});

export const loadInnerServicesSuccess = (resp, meta = {}) => ({
  type: c.LOAD_INNER_SERVICES_SUCCESS,
  payload: resp,
  meta,
});

export const loadInnerServicesFailure = (error, meta = {}) => ({
  type: c.LOAD_INNER_SERVICES_FAILURE,
  payload: error,
  meta,
  error: true,
});
