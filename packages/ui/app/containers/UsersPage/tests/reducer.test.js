import { fromJS } from 'immutable';
import usersPageReducer from '../reducer';

describe('usersPageReducer', () => {
  it('returns the initial state', () => {
    expect(usersPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
