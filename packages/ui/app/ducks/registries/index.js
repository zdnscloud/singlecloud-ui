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
  list: {},
  errorsList: [],
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
      const {
        clusterID,
      } = meta;
      return state
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.LOAD_REGISTRIES_FAILURE))
        .setIn([
          'data',
          clusterID,
        ], fromJS(data))
        .setIn([
          'list',
          clusterID,
        ], fromJS(list));
    }
    case c.LOAD_REGISTRIES_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.CREATE_REGISTRY:
      return state;
    case c.CREATE_REGISTRY_SUCCESS: {
      const data = payload.response;
      const {
        clusterID,
      } = meta;
      return state.setIn([
        'data',
        clusterID,
        data.id,
      ], fromJS(data))
      .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.CREATE_REGISTRY_FAILURE));
    }
    case c.CREATE_REGISTRY_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.READ_REGISTRY:
      return state;
    case c.READ_REGISTRY_SUCCESS: {
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
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.READ_REGISTRY_FAILURE));
      }
      return state;
    }
    case c.READ_REGISTRY_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.REMOVE_REGISTRY:
      return state;
    case c.REMOVE_REGISTRY_SUCCESS: {
      const { id } = meta;
      const {
        clusterID,
      } = meta;
      const status = getByKey(payload, ['status']);
      if (status === 202) {
        return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === c.REMOVE_REGISTRY_FAILURE));
      }
      return state
        .removeIn([
          'data',
          clusterID,
          id,
        ])
        .updateIn([
          'list',
          clusterID,
        ], (l) => l.filterNot((i) => i === id))
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.REMOVE_REGISTRY_FAILURE));
    }
    case c.REMOVE_REGISTRY_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.CLEAR_ERRORS_LIST:
      return state.update('errorsList', (errors) => errors.clear());

    default:
      return state;
  }
};

export default reducer;
