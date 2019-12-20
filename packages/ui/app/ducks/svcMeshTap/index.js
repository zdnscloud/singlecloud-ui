/**
 * Duck: SvcMeshTap
 * reducer: svcMeshTap
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
  isTapping: false,
});

const c = constants;

export const reducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.SVC_MESH_TAP_START: {
      return state.set('isTapping', true);
    }

    case c.SVC_MESH_TAP_STOP: {
      return state.set('isTapping', false);
    }

    case c.SVC_MESH_TAP_RESET: {
      const {
        clusterID,
        namespaceID,
      } = meta;
      return state.setIn(['data', clusterID, namespaceID], fromJS([]));
    }

    case c.SVC_MESH_TAP_ADD: {
      const {
        clusterID,
        namespaceID,
      } = meta;
      return state.updateIn(['data', clusterID, namespaceID], (list) => {
        if (!list) {
          return fromJS([payload]);
        }
        return list.push(fromJS(payload));
      });
    }

    default:
      return state;
  }
};

export default reducer;
