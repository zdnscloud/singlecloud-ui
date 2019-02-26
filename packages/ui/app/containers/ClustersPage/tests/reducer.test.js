import { fromJS } from 'immutable';
import clustersPageReducer from '../reducer';

describe('clustersPageReducer', () => {
  it('returns the initial state', () => {
    expect(clustersPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
