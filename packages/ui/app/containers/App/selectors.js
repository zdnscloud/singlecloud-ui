import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';

import OverviewIcon from 'components/Icons/Overview';
import ManagementIcon from 'components/Icons/Management';
import ApplicationIcon from 'components/Icons/Application';
import SystemIcon from 'components/Icons/System';

import { makeSelectRole, makeSelectIsAdmin } from 'ducks/role/selectors';

import { makeSelectCurrentNamespaceID } from '../NamespacesPage/selectors';

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

export const makeSelectShowMenuText = () =>
  createSelector(
    selectApp,
    (appState) => appState.get('showMenuText')
  );

export const makeSelectShowEvents = () =>
  createSelector(
    selectApp,
    (appState) => appState.get('showEvents')
  );

export const makeSelectUserMenus = () =>
  createSelector(
    selectApp,
    makeSelectIsAdmin(),
    makeSelectRole(),
    (appState, isAdmin, role) =>
      [
        { name: 'profile', path: `/users/${role.get('user')}/profile` },
        isAdmin ? { name: 'list', path: '/users' } : null,
      ].filter((n) => !!n)
  );

export const makeSelectLeftMenus = () =>
  createSelector(
    selectApp,
    makeSelectClusterID(),
    makeSelectCurrentNamespaceID(),
    makeSelectIsAdmin(),
    (appState, cluster, namespace, isAdmin) => {
      const menus = [{ name: 'Global', path: '/clusters', icon: OverviewIcon }];
      if (cluster !== '') {
        return menus.concat([
          {
            name: 'ClusterManagement',
            children: [
              { name: 'Overview', path: `/clusters/${cluster}` },
              { name: 'Namespaces', path: `/clusters/${cluster}/namespaces` },
              { name: 'Nodes', path: `/clusters/${cluster}/nodes` },
            ],
            icon: ManagementIcon,
          },
          {
            name: 'AppManagement',
            children: [
              {
                name: 'Deployments',
                path: `/clusters/${cluster}/namespaces/${namespace}/deployments`,
              },
              {
                name: 'ConfigMaps',
                path: `/clusters/${cluster}/namespaces/${namespace}/configmaps`,
              },
              {
                name: 'Ingresses',
                path: `/clusters/${cluster}/namespaces/${namespace}/ingresses`,
              },
              {
                name: 'Services',
                path: `/clusters/${cluster}/namespaces/${namespace}/services`,
              },
            ],
            icon: ApplicationIcon,
          },
          {
            name: 'SystemManagement',
            children: [
              {
                name: 'ServiceLink',
                path: `/clusters/${cluster}/namespaces/${namespace}/topology`,
              },
              {
                name: 'Storage',
                path: `/clusters/${cluster}/storage`,
              },
              {
                name: 'Network',
                path: `/clusters/${cluster}/network`,
              },
            ],
            icon: SystemIcon,
          },
        ]);
      }
      return menus;
    }
  );
