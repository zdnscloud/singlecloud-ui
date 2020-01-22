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
  list: {},
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
      const { clusterID, namespaceID } = meta;
      return state
        .setIn(['list', clusterID, namespaceID], fromJS([]))
        .setIn(['data', clusterID, namespaceID], fromJS({}));
    }

    case c.SVC_MESH_TAP_ADD: {
      const { clusterID, namespaceID } = meta;
      const data = payload;
      const { event } = data;
      const { requestInit, responseInit, responseEnd } = event;
      let originId;
      let readyState;
      if (requestInit.id.base) {
        readyState = 0;
        originId = requestInit.id;
      }
      if (responseInit.id.base) {
        readyState = 1;
        originId = responseInit.id;
      }
      if (responseEnd.id.base) {
        readyState = 2;
        originId = responseEnd.id;
      }
      const id = `base:${originId.base};stream:${originId.stream}`;
      data.id = id;
      data.originId = originId;
      data.readyState = readyState;
      data.laseUpdateTime = new Date();

      let mState = state;
      if (readyState === 0) {
        mState = state.updateIn(['list', clusterID, namespaceID], (list) => {
          if (list) {
            if (list.size > 40) {
              return list.slice(0, 39).unshift(id);
            }
            return list.unshift(id);
          }
          return fromJS([id]);
        });
      }

      return mState.updateIn(['data', clusterID, namespaceID, id], (item) => {
        if (readyState === 0) {
          return fromJS(data);
        }
        if (readyState === 1) {
          return item
            .set('readyState', readyState)
            .set('laseUpdateTime', data.laseUpdateTime)
            .setIn(['event', 'responseInit'], fromJS(responseInit));
        }
        if (readyState === 2) {
          return item
            .set('readyState', readyState)
            .set('laseUpdateTime', data.laseUpdateTime)
            .setIn(['event', 'responseEnd'], fromJS(responseEnd));
        }
        return item;
      });
    }

    default:
      return state;
  }
};

export default reducer;
