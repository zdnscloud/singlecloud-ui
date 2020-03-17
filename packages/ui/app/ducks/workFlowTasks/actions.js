/**
 * Duck: WorkFlowTasks
 * actions: workFlowTasks
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const loadWorkFlowTasks = (url, meta = {}) => ({
  type: c.LOAD_WORK_FLOW_TASKS,
  payload: url,
  meta,
});

export const loadWorkFlowTasksSuccess = (resp, meta = {}) => ({
  type: c.LOAD_WORK_FLOW_TASKS_SUCCESS,
  payload: resp,
  meta,
});

export const loadWorkFlowTasksFailure = (error, meta = {}) => ({
  type: c.LOAD_WORK_FLOW_TASKS_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const createWorkFlowTask = (data, meta = {}) => ({
  type: c.CREATE_WORK_FLOW_TASK,
  payload: data,
  meta,
});

export const createWorkFlowTaskSuccess = (resp, meta = {}) => ({
  type: c.CREATE_WORK_FLOW_TASK_SUCCESS,
  payload: resp,
  meta,
});

export const createWorkFlowTaskFailure = (error, meta = {}) => ({
  type: c.CREATE_WORK_FLOW_TASK_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const readWorkFlowTask = (id, meta = {}) => ({
  type: c.READ_WORK_FLOW_TASK,
  payload: id,
  meta,
});

export const readWorkFlowTaskSuccess = (resp, meta = {}) => ({
  type: c.READ_WORK_FLOW_TASK_SUCCESS,
  payload: resp,
  meta,
});

export const readWorkFlowTaskFailure = (error, meta = {}) => ({
  type: c.READ_WORK_FLOW_TASK_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const clearErrorsList = (payload, meta) => ({
  type: c.CLEAR_ERRORS_LIST,
  payload,
  meta,
});
