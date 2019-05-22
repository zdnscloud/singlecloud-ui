import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the terminalPage state domain
 */

export const selectTerminalPageDomain = (state) =>
  state.get('terminalPage', initialState);

/**
 * Other specific selectors
 */
export const makeSelectTermIsOpen = () =>
  createSelector(
    selectTerminalPageDomain,
    (substate) => substate.get('termIsOpen')
  );

/**
 * Default selector used by TerminalPage
 */

export const makeSelectTerminalPage = () =>
  createSelector(
    selectTerminalPageDomain,
    (substate) => substate.toJS()
  );

export default makeSelectTerminalPage;
