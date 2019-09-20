/**
 * Duck: OuterServices
 * actions: outerServices
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadOuterServices = (url, meta = {}) => ({
  type: c.LOAD_OUTER_SERVICES,
  payload: url,
  meta,
});

export const loadOuterServicesSuccess = (resp, meta = {}) => ({
  type: c.LOAD_OUTER_SERVICES_SUCCESS,
  payload: resp,
  meta,
});

export const loadOuterServicesFailure = (error, meta = {}) => ({
  type: c.LOAD_OUTER_SERVICES_FAILURE,
  payload: error,
  meta,
  error: true,
});
