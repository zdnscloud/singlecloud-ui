import { fromJS } from 'immutable';
import podsPageReducer from '../reducer';

describe('podsPageReducer', () => {
  it('returns the initial state', () => {
    expect(podsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
