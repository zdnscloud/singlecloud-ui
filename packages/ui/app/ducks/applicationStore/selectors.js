import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import { makeSelectChartID } from 'ducks/app/selectors';
import { prefix } from './constants';

/**
 * Direct selector to the charts duck
 */
export const selectChartsDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    selectChartsDomain,
    (substate) => '/apis/zcloud.cn/v1/charts'
  );

export const makeSelectCharts = () =>
  createSelector(
    selectChartsDomain,
    (substate) => substate.get('charts') || substate.clear()
  );

export const makeSelectChartsList = () =>
  createSelector(
    selectChartsDomain,
    makeSelectCharts(),
    (substate, charts) =>
      substate.get('list').map((id) => charts.get(id))
  );

export const makeSelectCurrentChart = () =>
  createSelector(
    selectChartsDomain,
    (substate) => substate.get('chart') || substate.clear()
  );
/**
 * Default selector used by Charts
 */
export default makeSelectCharts;
