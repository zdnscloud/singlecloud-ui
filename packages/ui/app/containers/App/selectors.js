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

export const makeSelectMenus = () =>
  createSelector(
    selectApp,
    makeSelectActiveCluster(),
    (appState, cluster) => {
      const menus = [{ name: 'clusters', path: '/clusters' }];
      if (cluster !== '') {
        return menus.concat([
          { name: 'namespaces', path: `/clusters/${cluster}/namespaces` },
          { name: 'applications', path: `/clusters/${cluster}/applications` },
          { name: 'storage', path: `/clusters/${cluster}/storage` },
          { name: 'network', path: `/clusters/${cluster}/network` },
          { name: 'topology', path: `/clusters/${cluster}/topology` },
        ]);
      }
      return menus;
    }
  );
