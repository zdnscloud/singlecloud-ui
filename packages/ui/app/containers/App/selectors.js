import { createSelector } from 'reselect';
import { createMatchSelector, getLocation } from 'connected-react-router/immutable';

const selectRouter = (state) => state.get('router');

export const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    (routerState) => routerState.get('location').toJS()
  );

export const makeSelectClusterID = () =>
  createSelector(
    createMatchSelector('/clusters/:cluster_id'),
    (match) => {
      if (match && match.params) {
        return match.params.cluster_id;
      }
      return '';
    }
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
    makeSelectClusterID(),
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
