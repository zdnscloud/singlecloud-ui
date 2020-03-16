/**
 * Duck: WorkFlows
 * actions: workFlows
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadWorkFlows = (url, meta = {}) => ({
  type: c.LOAD_WORK_FLOWS,
  payload: url,
  meta,
});

export const loadWorkFlowsSuccess = (resp, meta = {}) => ({
  type: c.LOAD_WORK_FLOWS_SUCCESS,
  payload: resp,
  meta,
});

export const loadWorkFlowsFailure = (error, meta = {}) => ({
  type: c.LOAD_WORK_FLOWS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createWorkFlow = (data, meta = {}) => ({
  type: c.CREATE_WORK_FLOW,
  payload: data,
  meta,
});

export const createWorkFlowSuccess = (resp, meta = {}) => ({
  type: c.CREATE_WORK_FLOW_SUCCESS,
  payload: resp,
  meta,
});

export const createWorkFlowFailure = (error, meta = {}) => ({
  type: c.CREATE_WORK_FLOW_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const updateWorkFlow = (data, meta = {}) => ({
  type: c.UPDATE_WORK_FLOW,
  payload: data,
  meta,
});

export const updateWorkFlowSuccess = (resp, meta = {}) => ({
  type: c.UPDATE_WORK_FLOW_SUCCESS,
  payload: resp,
  meta,
});

export const updateWorkFlowFailure = (error, meta = {}) => ({
  type: c.UPDATE_WORK_FLOW_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readWorkFlow = (id, meta = {}) => ({
  type: c.READ_WORK_FLOW,
  payload: id,
  meta,
});

export const readWorkFlowSuccess = (resp, meta = {}) => ({
  type: c.READ_WORK_FLOW_SUCCESS,
  payload: resp,
  meta,
});

export const readWorkFlowFailure = (error, meta = {}) => ({
  type: c.READ_WORK_FLOW_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const removeWorkFlow = (id, meta = {}) => ({
  type: c.REMOVE_WORK_FLOW,
  payload: id,
  meta,
});

export const removeWorkFlowSuccess = (resp, meta = {}) => ({
  type: c.REMOVE_WORK_FLOW_SUCCESS,
  payload: resp,
  meta,
});

export const removeWorkFlowFailure = (error, meta = {}) => ({
  type: c.REMOVE_WORK_FLOW_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const executeWorkFlowAction = (action, data, meta = {}) => ({
  type: c.EXECUTE_WORK_FLOW_ACTION,
  payload: {
    action,
    data,
  },
  meta,
});

export const executeWorkFlowActionSuccess = (resp, meta = {}) => ({
  type: c.EXECUTE_WORK_FLOW_ACTION_SUCCESS,
  payload: resp,
  meta,
});

export const executeWorkFlowActionFailure = (error, meta = {}) => ({
  type: c.EXECUTE_WORK_FLOW_ACTION_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
