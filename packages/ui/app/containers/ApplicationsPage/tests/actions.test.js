import { initAction } from '../actions';
import { INIT_ACTION } from '../constants';

describe('DeploymentsPage actions', () => {
  describe('Default Action', () => {
    it('has a type of INIT_ACTION', () => {
      const expected = {
        type: INIT_ACTION,
      };
      expect(initAction()).toEqual(expected);
    });
  });
});
