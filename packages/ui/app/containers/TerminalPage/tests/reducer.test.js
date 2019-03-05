import { fromJS } from 'immutable';
import terminalPageReducer from '../reducer';

describe('terminalPageReducer', () => {
  it('returns the initial state', () => {
    expect(terminalPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
