import { fromJS } from 'immutable';
import applicationsPageReducer from '../reducer';

describe('applicationsPageReducer', () => {
  it('returns the initial state', () => {
    expect(applicationsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
