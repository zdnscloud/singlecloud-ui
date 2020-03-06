/**
 * Duck: Nodes
 * reducer: nodes
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
    case c.LOAD_NODES:
      return state;
    case c.LOAD_NODES_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      const {
        clusterID,
      } = meta;
      return state
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.LOAD_NODES_FAILURE))
        .setIn([
          'data',
          clusterID,
        ], fromJS(data))
        .setIn([
          'list',
          clusterID,
        ], fromJS(list));
    }
    case c.LOAD_NODES_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));



    case c.READ_NODE:
      return state;
    case c.READ_NODE_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      const {
        clusterID,
      } = meta;
      if (id) {
        return state.setIn([
          'data',
          clusterID,
          id,
        ], fromJS(data))
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.READ_NODE_FAILURE));
      }
      return state;
    }
    case c.READ_NODE_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));


    case c.EXECUTE_NODE_ACTION:
      return state;
    case c.EXECUTE_NODE_ACTION_SUCCESS:
      if (meta.patch === true) {
        const {
          clusterID,
          id,
        } = meta;
        const data = getByKey(payload, ['response']);
        return state.mergeDeepIn([
          'data',
          clusterID,
          id,
        ], data)
          .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.EXECUTE_NODE_ACTION_FAILURE));
      }
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === c.EXECUTE_NODE_ACTION_FAILURE));
    case c.EXECUTE_NODE_ACTION_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.CLEAR_ERRORS_LIST:
      return state.update('errorsList', (errors) => errors.clear());

    default:
      return state;
  }
};

export default reducer;
