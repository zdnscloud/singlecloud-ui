/**
 *
 * Service Links Duck
 *
 */
import { fromJS } from 'immutable';
import getByKey from '@gsmlg/utils/getByKey';
import { procCollectionData } from '@gsmlg/utils/procData';

import * as constants from './constants';
import * as actions from './actions';

const { prefix } = constants;

export { constants, actions, prefix };

export const initialState = fromJS({
  outerServices: {},
  innerServices: {},
});

const c = constants;

export const serviceLinksReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_OUTER_SERVICES:
      return state;
    case c.LOAD_OUTER_SERVICES_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const { data } = payload.response;
      return state.updateIn(['outerServices', clusterID, namespaceID], () => fromJS(data));
    }
    case c.LOAD_OUTER_SERVICES_FAILURE:
      return state;

    case c.LOAD_INNER_SERVICES:
      return state;
    case c.LOAD_INNER_SERVICES_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const { data } = payload.response;
      return state.updateIn(['innerServices', clusterID, namespaceID], () => fromJS(data));
    }
    case c.LOAD_INNER_SERVICES_FAILURE:
      return state;

    default:
      return state;
  }
};

export default serviceLinksReducer;
