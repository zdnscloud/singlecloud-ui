import { fromJS } from 'immutable';
import servicesPageReducer from '../reducer';

describe('servicesPageReducer', () => {
  it('returns the initial state', () => {
    expect(servicesPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
