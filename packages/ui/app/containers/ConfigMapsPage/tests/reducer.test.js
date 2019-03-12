import { fromJS } from 'immutable';
import configMapsPageReducer from '../reducer';

describe('configMapsPageReducer', () => {
  it('returns the initial state', () => {
    expect(configMapsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
