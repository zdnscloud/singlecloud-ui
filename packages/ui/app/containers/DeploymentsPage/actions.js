/*
 *
 * DeploymentsPage actions
 *
 */

import { INIT_ACTION, UPDATE_FORM } from './constants';

export function initAction() {
  return {
    type: INIT_ACTION,
  };
}

export function updateForm(name, value) {
  return {
    type: UPDATE_FORM,
    payload: {
      name,
      value,
    },
  };
}
