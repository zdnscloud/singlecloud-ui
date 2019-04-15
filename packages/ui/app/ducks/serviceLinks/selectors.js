import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import { prefix } from './constants';

/**
 * Direct selector to the outerServices duck
 */

const makeSelectServiceLinksDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectOuterServices = () =>
  createSelector(
    makeSelectServiceLinksDomain,
    (substate) => substate.get('outerServices')
  );

export const makeSelectInnerServices = () =>
  createSelector(
    makeSelectServiceLinksDomain,
    (substate) => substate.get('innerServices')
  );

/**
 * Default selector used by LoginPage
 */

const makeSelectServiceLinks = () =>
  createSelector(
    makeSelectServiceLinksDomain,
    (substate) => substate
  );

export default makeSelectServiceLinks;
