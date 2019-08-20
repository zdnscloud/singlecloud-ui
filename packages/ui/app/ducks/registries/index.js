/**
 * Duck: Registries
 * reducer: registries
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
  list: [],
  selectedData: null,
});

const c = constants;

export const reducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_REGISTRIES:
      return state;
    case c.LOAD_REGISTRIES_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      
      return state
        .setIn(['data'], fromJS(data))
        .setIn(['list'], fromJS(list));
    }
    case c.LOAD_REGISTRIES_FAILURE:
      return state;


    case c.UPDATE_REGISTRY:
      return state;
    case c.UPDATE_REGISTRY_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      
      if (id) {
        return state.setIn(['data', id], fromJS(data));
      }
      return state;
    }
    case c.UPDATE_REGISTRY_FAILURE:
      return state;

    case c.READ_REGISTRY:
      return state;
    case c.READ_REGISTRY_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      
      if (id) {
        return state.setIn(['data', id], fromJS(data));
      }
      return state;
    }
    case c.READ_REGISTRY_FAILURE:
      return state;

    default:
      return state;
  }
};

export default reducer;
