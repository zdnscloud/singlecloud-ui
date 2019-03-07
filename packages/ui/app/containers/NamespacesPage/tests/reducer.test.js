import { fromJS } from 'immutable';
import namespacesPageReducer from '../reducer';

describe('namespacesPageReducer', () => {
  it('returns the initial state', () => {
    expect(namespacesPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
