/**
 * Duck: Applications
 * reducer: applications
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
  selectedData: null,
  deleteError: '',
});

const c = constants;

export const reducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_APPLICATIONS:
      return state;
    case c.LOAD_APPLICATIONS_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      const { clusterID, namespaceID } = meta;
      return state
        .setIn(['data', clusterID, namespaceID], fromJS(data))
        .setIn(['list', clusterID, namespaceID], fromJS(list));
    }
    case c.LOAD_APPLICATIONS_FAILURE:
      return state;

    case c.CREATE_APPLICATION:
      return state;
    case c.CREATE_APPLICATION_SUCCESS: {
      const data = payload.response;
      const { clusterID, namespaceID } = meta;
      return state.setIn(
        ['data', clusterID, namespaceID, data.id],
        fromJS(data)
      );
    }
    case c.CREATE_APPLICATION_FAILURE:
      return state;

    case c.READ_APPLICATION:
      return state;
    case c.READ_APPLICATION_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      const { clusterID, namespaceID } = meta;
      if (id) {
        return state.setIn(['data', clusterID, namespaceID, id], fromJS(data));
      }
      return state;
    }
    case c.READ_APPLICATION_FAILURE:
      return state;

    case c.REMOVE_APPLICATION:
      return state;
    case c.REMOVE_APPLICATION_SUCCESS: {
      const { id } = meta;
      const { clusterID, namespaceID } = meta;
      return state
        .removeIn(['data', clusterID, namespaceID, id])
        .updateIn(['list', clusterID, namespaceID], (l) =>
          l.filterNot((i) => i === id)
        );
    }
    case c.REMOVE_APPLICATION_FAILURE:
      // eslint-disable-next-line no-case-declarations
      const data = payload.response.message;
      return state.set('deleteError', data);

    case c.CLEAR_DELETE_ERROR_INFO:
      return state.set('deleteError', '');

    default:
      return state;
  }
};

export default reducer;
