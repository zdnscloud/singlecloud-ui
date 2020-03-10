/**
 * Duck: PersistentVolumeClaims
 * reducer: persistentVolumeClaims
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
    case c.LOAD_PERSISTENT_VOLUME_CLAIMS:
      return state;
    case c.LOAD_PERSISTENT_VOLUME_CLAIMS_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      const {
        clusterID,
        namespaceID,
      } = meta;
      return state
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.LOAD_PERSISTENT_VOLUME_CLAIMS_FAILURE))
        .setIn([
          'data',
          clusterID,
          namespaceID,
        ], fromJS(data))
        .setIn([
          'list',
          clusterID,
          namespaceID,
        ], fromJS(list));
    }
    case c.LOAD_PERSISTENT_VOLUME_CLAIMS_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.REMOVE_PERSISTENT_VOLUME_CLAIM:
      return state;
    case c.REMOVE_PERSISTENT_VOLUME_CLAIM_SUCCESS: {
      const { id } = meta;
      const {
        clusterID,
        namespaceID,
      } = meta;
      const status = getByKey(payload, ['status']);
      if (status === 202) {
        return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === c.REMOVE_PERSISTENT_VOLUME_CLAIM_FAILURE));
      }
      return state
        .removeIn([
          'data',
          clusterID,
          namespaceID,
          id,
        ])
        .updateIn([
          'list',
          clusterID,
          namespaceID,
        ], (l) => l.filterNot((i) => i === id))
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.REMOVE_PERSISTENT_VOLUME_CLAIM_FAILURE));
    }
    case c.REMOVE_PERSISTENT_VOLUME_CLAIM_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.CLEAR_ERRORS_LIST:
      return state.update('errorsList', (errors) => errors.clear());

    default:
      return state;
  }
};

export default reducer;
