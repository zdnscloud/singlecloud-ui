import { createSelector } from 'reselect';

const selectRouter = (state) => state.get('router');

export const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    (routerState) => routerState.get('location').toJS()
  );

const selectApp = (state) => state.get('app');

export const makeSelectActiveCluster = () =>
  createSelector(
    selectApp,
    (appState) => appState.get('activeCluster')
  );
