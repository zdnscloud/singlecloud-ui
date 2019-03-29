import { fromJS } from 'immutable';
import clusterDetailPageReducer from '../reducer';

describe('clusterDetailPageReducer', () => {
  it('returns the initial state', () => {
    expect(clusterDetailPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
