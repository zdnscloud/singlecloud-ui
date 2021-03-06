/**
 * Duck: AuditLogs
 * reducer: auditLogs
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
  errorsList: [],
});

const c = constants;

export const reducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_AUDIT_LOGS:
      return state;
    case c.LOAD_AUDIT_LOGS_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      return state
        .update('errorsList', (errors) => errors.filterNot((e) => e.type === c.LOAD_AUDIT_LOGS_FAILURE))
        .setIn([
          'data',
        ], fromJS(data))
        .setIn([
          'list',
        ], fromJS(list));
    }
    case c.LOAD_AUDIT_LOGS_FAILURE:
      return state.update('errorsList', (errors) => errors.filterNot((e) => e.type === type).push({ type, payload, meta }));

    case c.CLEAR_ERRORS_LIST:
      return state.update('errorsList', (errors) => errors.clear());

    default:
      return state;
  }
};

export default reducer;
