/**
 *
 * Networks Duck
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
  podNetworks: {},
  serviceNetworks: {},
});

const c = constants;

export const networksReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_POD_NETWORKS:
      return state;
    case c.LOAD_POD_NETWORKS_SUCCESS: {
      const { clusterID } = meta;
      const { data } = payload.response;
      return state.setIn(['podNetworks', clusterID], fromJS(data));
    }
    case c.LOAD_POD_NETWORKS_FAILURE:
      return state;

    case c.LOAD_SERVICE_NETWORKS:
      return state;
    case c.LOAD_SERVICE_NETWORKS_SUCCESS: {
      const { clusterID } = meta;
      const { data } = payload.response;
      return state.setIn(['serviceNetworks', clusterID], fromJS(data));
    }
    case c.LOAD_SERVICE_NETWORKS_FAILURE:
      return state;

    default:
      return state;
  }
};

export default networksReducer;
