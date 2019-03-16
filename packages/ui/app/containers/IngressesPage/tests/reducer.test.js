import { fromJS } from 'immutable';
import ingressesPageReducer from '../reducer';

describe('ingressesPageReducer', () => {
  it('returns the initial state', () => {
    expect(ingressesPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
