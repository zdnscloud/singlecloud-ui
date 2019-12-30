/**
 * Duck: Alarms
 * reducer: alarms
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
  unreadCount: 0,
});

const c = constants;

export const reducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_ALARMS:
      return state;
    case c.LOAD_ALARMS_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      return state
        .update('errorsList', (errors) =>
          errors.filterNot((e) => e.type === c.LOAD_ALARMS_FAILURE)
        )
        .setIn(['data'], fromJS(data))
        .setIn(['list'], fromJS(list));
    }
    case c.LOAD_ALARMS_FAILURE:
      return state.update('errorsList', (errors) =>
        errors.filterNot((e) => e.type === type).push({ type, payload, meta })
      );

    case c.UPDATE_ALARM:
      return state;
    case c.UPDATE_ALARM_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      if (id) {
        return state
          .setIn(['data', id], fromJS(data))
          .update('errorsList', (errors) =>
            errors.filterNot((e) => e.type === c.UPDATE_ALARM_FAILURE)
          );
      }
      return state;
    }
    case c.UPDATE_ALARM_FAILURE:
      return state.update('errorsList', (errors) =>
        errors.filterNot((e) => e.type === type).push({ type, payload, meta })
      );

    case c.REMOVE_ALARM:
      return state;
    case c.REMOVE_ALARM_SUCCESS: {
      const { id } = meta;
      return state
        .removeIn(['data', id])
        .updateIn(['list'], (l) => l.filterNot((i) => i === id))
        .update('errorsList', (errors) =>
          errors.filterNot((e) => e.type === c.REMOVE_ALARM_FAILURE)
        );
    }
    case c.REMOVE_ALARM_FAILURE:
      return state.update('errorsList', (errors) =>
        errors.filterNot((e) => e.type === type).push({ type, payload, meta })
      );

    default:
      return state;
  }
};

export default reducer;
