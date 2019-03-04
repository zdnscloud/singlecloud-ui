/*
 *
 * DeploymentsPage reducer
 *
 */

import { fromJS } from 'immutable';
import { INIT_ACTION } from './constants';

export const initialState = fromJS({
  depolyments: {},
  tableList: [],
  createFormData: {},
});

function deploymentsPageReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_ACTION:
      return state;

    default:
      return state;
  }
}

export default deploymentsPageReducer;
