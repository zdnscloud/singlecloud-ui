/**
 *
 * Applications Duck
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
  applications: {},
  list: [],
  selectedApplication: {},
  deleteError: '',
});

const c = constants;

export const applicationsReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_APPLICATIONS:
      return state;
    case c.LOAD_APPLICATIONS_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const { data, list } = procCollectionData(payload);
      return state.setIn(['applications',clusterID, namespaceID], fromJS(data)).set('list', fromJS(list));
    }
    case c.LOAD_APPLICATIONS_FAILURE:
      return state;

    case c.REMOVE_APPLICATION:
      return state;
    case c.REMOVE_APPLICATION_SUCCESS: {
      const { id } = meta;
      return state
        .deleteIn(['applications', id])
        .update('list', (l) => l.filterNot((i) => i === id));
    }
    case c.REMOVE_APPLICATION_FAILURE:
      const data = payload.response.message;
      return state.set('deleteError', data);

    case c.CLEAR_DELETE_ERROR_INFO:
        return state.set('deleteError', '');

    case c.CHANGE_APPLICATION:
      return state.setIn(['selectedApplication'], payload.applicationID);

    default:
      return state;
  }
};

export default applicationsReducer;
