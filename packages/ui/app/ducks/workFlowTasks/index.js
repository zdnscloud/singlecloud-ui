/**
 * Duck: WorkFlowTasks
 * reducer: workFlowTasks
 *
 */
import _ from 'lodash';
import { fromJS } from 'immutable';
import getByKey from '@gsmlg/utils/getByKey';
import { procCollectionData } from '@gsmlg/utils/procData';

import * as constants from './constants';
import * as actions from './actions';

const { prefix } = constants;

export { constants, actions, prefix };

export const initialState = fromJS({
  data: {},
  list: {},
  errorsList: [],
});

const c = constants;

export const reducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_WORK_FLOW_TASKS:
      return state;
    case c.LOAD_WORK_FLOW_TASKS_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      const {
        clusterID,
        namespaceID,
        workFlowID,
      } = meta;
      return state
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.LOAD_WORK_FLOW_TASKS_FAILURE))
        .setIn([
          'data',
          clusterID,
          namespaceID,
          workFlowID,
        ], fromJS(data))
        .setIn([
          'list',
          clusterID,
          namespaceID,
          workFlowID,
        ], fromJS(list));
    }
    case c.LOAD_WORK_FLOW_TASKS_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.CREATE_WORK_FLOW_TASK:
      return state;
    case c.CREATE_WORK_FLOW_TASK_SUCCESS: {
      const data = payload.response;
      const {
        clusterID,
        namespaceID,
        workFlowID,
      } = meta;
      return state.setIn([
        'data',
        clusterID,
        namespaceID,
        workFlowID,
        data.id,
      ], fromJS(data))
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.CREATE_WORK_FLOW_TASK_FAILURE));
    }
    case c.CREATE_WORK_FLOW_TASK_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));


    case c.READ_WORK_FLOW_TASK:
      return state;
    case c.READ_WORK_FLOW_TASK_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      const {
        clusterID,
        namespaceID,
        workFlowID,
      } = meta;
      if (id) {
        return state.setIn([
          'data',
          clusterID,
          namespaceID,
          workFlowID,
          id,
        ], fromJS(data))
          .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.READ_WORK_FLOW_TASK_FAILURE));
      }
      return state;
    }
    case c.READ_WORK_FLOW_TASK_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.REMOVE_WORK_FLOW_TASK:
      return state;
    case c.REMOVE_WORK_FLOW_TASK_SUCCESS: {
      const { id } = meta;
      const {
        clusterID,
        namespaceID,
        workFlowID,
      } = meta;
      return state
        .removeIn([
          'data',
          clusterID,
          namespaceID,
          workFlowID,
          id,
        ])
        .updateIn([
          'list',
          clusterID,
          namespaceID,
          workFlowID,
        ], (l) => l.filterNot((i) => i === id))
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.REMOVE_WORK_FLOW_TASK_FAILURE));
    }
    case c.REMOVE_WORK_FLOW_TASK_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));


    case c.CLEAR_ERRORS_LIST:
      return state.update('errorsList', (errors) => errors.clear());

    default:
      return state;
  }
};

export default reducer;
