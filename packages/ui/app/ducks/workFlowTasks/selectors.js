/**
 * Duck: WorkFlowTasks
 * selectors: workFlowTasks
 *
 */
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import {
  makeSelectCurrent as makeSelectCurrentWorkFlow,
  makeSelectCurrentID as makeSelectCurrentWorkFlowID } from 'ducks/workFlows/selectors';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';

import * as c from './constants';
import { initialState } from './index';

/**
 * Direct selector to the workFlowTasks domain
 */
export const selectDomain = (state) => state.get(c.prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrentWorkFlow(),
    (pt) => pt.getIn(['links', 'workflowtasks'])
  );

export const makeSelectData = () =>
  createSelector(
    selectDomain,
    (substate) => substate.get('data')
  );

export const makeSelectWorkFlowTasks = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    makeSelectCurrentWorkFlowID(),
    (
      substate,
      clusterID,
      namespaceID,
      workFlowID,
    ) =>
      substate.getIn([
        'data',
        clusterID,
        namespaceID,
        workFlowID,
      ]) || substate.clear()
  );

export const makeSelectWorkFlowTasksList = () =>
  createSelector(
    selectDomain,
    makeSelectWorkFlowTasks(),
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    makeSelectCurrentWorkFlowID(),
    (
      substate,
      data,
      clusterID,
      namespaceID,
      workFlowID,
    ) =>
      (substate.getIn([
        'list',
        clusterID,
        namespaceID,
        workFlowID,
      ]) || fromJS([])).map((id) => data.get(id)) || fromJS([])
  );

export const makeSelectCurrentID = () =>
  createSelector(
    createMatchSelector('*/workFlowTasks/:id/*'),
    (match) => {
      if (match && match.params) {
        return match.params.id;
      }
      return '';
    }
  );

export const makeSelectCurrent = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentClusterID(),
    makeSelectCurrentNamespaceID(),
    makeSelectCurrentWorkFlowID(),
    makeSelectCurrentID(),
    (
      substate,
      clusterID,
      namespaceID,
      workFlowID,
      id
    ) =>
      substate.getIn([
        'data',
        clusterID,
        namespaceID,
        workFlowID,
        id,
      ]) || substate.clear()
  );

export const makeSelectErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) => substate.get('errorsList')
  );

export const makeSelectLoadErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
        .filter(({ type }) => type === c.LOAD_WORK_FLOW_TASKS_FAILURE)
  );

export const makeSelectCreateErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
        .filter(({ type }) => type === c.CREATE_WORK_FLOW_TASK_FAILURE)
  );


export const makeSelectReadErrorsList = () =>
  createSelector(
    selectDomain,
    (substate) =>
      substate.get('errorsList')
        .filter(({ type }) => type === c.READ_WORK_FLOW_TASK_FAILURE)
  );


