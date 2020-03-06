/**
 * Duck: AuditLogs
 * actions: auditLogs
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadAuditLogs = (url, meta = {}) => ({
  type: c.LOAD_AUDIT_LOGS,
  payload: url,
  meta,
});

export const loadAuditLogsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_AUDIT_LOGS_SUCCESS,
  payload: resp,
  meta,
});

export const loadAuditLogsFailure = (error, meta = {}) => ({
  type: c.LOAD_AUDIT_LOGS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
