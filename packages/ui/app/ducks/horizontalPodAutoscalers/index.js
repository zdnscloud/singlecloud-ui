/**
 * Duck: HorizontalPodAutoscalers
 * reducer: horizontalPodAutoscalers
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
    case c.LOAD_HORIZONTAL_POD_AUTOSCALERS:
      return state;
    case c.LOAD_HORIZONTAL_POD_AUTOSCALERS_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      const {
        clusterID,
        namespaceID,
      } = meta;
      return state
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.LOAD_HORIZONTAL_POD_AUTOSCALERS_FAILURE))
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
    case c.LOAD_HORIZONTAL_POD_AUTOSCALERS_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.CREATE_HORIZONTAL_POD_AUTOSCALER:
      return state;
    case c.CREATE_HORIZONTAL_POD_AUTOSCALER_SUCCESS: {
      const data = payload.response;
      const {
        clusterID,
        namespaceID,
      } = meta;
      return state.setIn([
        'data',
        clusterID,
        namespaceID,
        data.id,
      ], fromJS(data))
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.CREATE_HORIZONTAL_POD_AUTOSCALER_FAILURE));
    }
    case c.CREATE_HORIZONTAL_POD_AUTOSCALER_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.UPDATE_HORIZONTAL_POD_AUTOSCALER:
      return state;
    case c.UPDATE_HORIZONTAL_POD_AUTOSCALER_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      const {
        clusterID,
        namespaceID,
      } = meta;
      if (id) {
        return state.setIn([
          'data',
          clusterID,
          namespaceID,
          id,
        ], fromJS(data))
          .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.UPDATE_HORIZONTAL_POD_AUTOSCALER_FAILURE));
      }
      return state;
    }
    case c.UPDATE_HORIZONTAL_POD_AUTOSCALER_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.READ_HORIZONTAL_POD_AUTOSCALER:
      return state;
    case c.READ_HORIZONTAL_POD_AUTOSCALER_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      const {
        clusterID,
        namespaceID,
      } = meta;
      if (id) {
        return state.setIn([
          'data',
          clusterID,
          namespaceID,
          id,
        ], fromJS(data))
          .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.READ_HORIZONTAL_POD_AUTOSCALER_FAILURE));
      }
      return state;
    }
    case c.READ_HORIZONTAL_POD_AUTOSCALER_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.REMOVE_HORIZONTAL_POD_AUTOSCALER:
      return state;
    case c.REMOVE_HORIZONTAL_POD_AUTOSCALER_SUCCESS: {
      const { id } = meta;
      const {
        clusterID,
        namespaceID,
      } = meta;
      const status = getByKey(payload, ['status']);
      if (status === 202) {
        return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === c.REMOVE_HORIZONTAL_POD_AUTOSCALER_FAILURE));
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
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.REMOVE_HORIZONTAL_POD_AUTOSCALER_FAILURE));
    }
    case c.REMOVE_HORIZONTAL_POD_AUTOSCALER_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.CLEAR_ERRORS_LIST:
      return state.update('errorsList', (errors) => errors.clear());

    default:
      return state;
  }
};

export default reducer;
