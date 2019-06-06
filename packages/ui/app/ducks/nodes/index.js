/**
 *
 * Nodes Duck
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
  nodes: {},
  list: [],
  selectedNode: {},
});

const c = constants;

export const nodesReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_NODES:
      return state;
    case c.LOAD_NODES_SUCCESS: {
      const { clusterID } = meta;
      const { data, list } = procCollectionData(payload);
      return state
        .setIn(['nodes', clusterID], fromJS(data))
        .set('list', fromJS(list));
    }
    case c.LOAD_NODES_FAILURE:
      return state;

    case c.CREATE_NODE:
      return state;
    case c.CREATE_NODE_SUCCESS: {
      const { clusterID } = meta;
      const data = payload.response;
      return state.setIn(['nodes', clusterID, data.id], fromJS(data));
    }
    case c.CREATE_NODE_FAILURE:
      return state;

    case c.REMOVE_NODE:
      return state;
    case c.REMOVE_NODE_SUCCESS: {
      const { clusterID, id } = meta;
      return state
        .deleteIn(['nodes', clusterID, id])
        .update('list', (l) => l.filterNot((i) => i === id));
    }
    case c.REMOVE_NODE_FAILURE:
      return state;

    case c.CHANGE_NODE:
      return state.setIn(
        ['selectedNode', payload.clusterID],
        payload.nodeID
      );

    default:
      return state;
  }
};

export default nodesReducer;
