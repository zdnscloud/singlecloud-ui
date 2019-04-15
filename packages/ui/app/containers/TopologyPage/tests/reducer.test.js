import { fromJS } from 'immutable';
import topologyPageReducer from '../reducer';

describe('topologyPageReducer', () => {
  it('returns the initial state', () => {
    expect(topologyPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
