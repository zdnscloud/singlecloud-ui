import { fromJS } from 'immutable';
import deploymentsPageReducer from '../reducer';

describe('deploymentsPageReducer', () => {
  it('returns the initial state', () => {
    expect(deploymentsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
