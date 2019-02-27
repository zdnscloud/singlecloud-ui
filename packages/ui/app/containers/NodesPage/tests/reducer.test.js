import { fromJS } from 'immutable';
import nodesPageReducer from '../reducer';

describe('nodesPageReducer', () => {
  it('returns the initial state', () => {
    expect(nodesPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
