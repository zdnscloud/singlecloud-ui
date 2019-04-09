import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import { makeSelectRole } from 'ducks/role/selectors';
import { makeSelectCurrentNamespace } from '../NamespacesPage/selectors';

const selectRouter = (state) => state.get('router');

export const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    (routerState) => routerState.get('location')
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

export const makeSelectNamespaceID = () =>
  createSelector(
    createMatchSelector('/clusters/:cluster_id/namespaces/:namespace_id'),
    (match) => {
      if (match && match.params) {
        return match.params.namespace_id;
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
    makeSelectCurrentNamespace(),
    (appState, cluster, namespace) => {
      const menus = [{ name: 'clusters', path: '/clusters' }];
      if (cluster !== '') {
        return menus.concat([
          { name: 'nodes', path: `/clusters/${cluster}/nodes` },
          { name: 'namespaces', path: `/clusters/${cluster}/namespaces` },
          { name: 'applications', path: `/clusters/${cluster}/namespaces/${namespace}/applications` },
          { name: 'storage', path: `/clusters/${cluster}/storage` },
          { name: 'network', path: `/clusters/${cluster}/network` },
          { name: 'topology', path: `/clusters/${cluster}/topology` },
        ]);
      }
      return menus;
    }
  );

export const makeSelectShowEvents = () =>
  createSelector(
    selectApp,
    (appState) => appState.get('showEvents')
  );

export const makeSelectUserMenus = () =>
  createSelector(
    selectApp,
    (appState) => {
      return [
        { name: 'profile', path: '/role' },
        { name: 'list', path: '/users' },
        { name: 'logout', path: '/role/logout' },
      ];
    }
  );
