import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the terminalPage state domain
 */

const selectTerminalPageDomain = (state) =>
  state.get('terminalPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TerminalPage
 */

const makeSelectTerminalPage = () =>
  createSelector(
    selectTerminalPageDomain,
    (substate) => substate.toJS(),
  );

export default makeSelectTerminalPage;
export { selectTerminalPageDomain };
