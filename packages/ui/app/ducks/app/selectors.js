import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';

import OverviewIcon from 'components/Icons/Overview';
import ManagementIcon from 'components/Icons/Management';
import ApplicationIcon from 'components/Icons/Application';
import SystemIcon from 'components/Icons/System';
import UserQuotasIcon from 'components/Icons/UserQuotas';

import { makeSelectRole, makeSelectIsAdmin } from 'ducks/role/selectors';

import { makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';

const selectRouter = (state) => state.get('router');

export const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    (routerState) => routerState.get('location')
  );

export const makeSelectClusterID = () =>
  createSelector(
    createMatchSelector('/clusters/:cluster_id/*'),
    (match) => {
      if (match && match.params) {
        return match.params.cluster_id;
      }
      return '';
    }
  );

export const makeSelectUserQuotaID = () =>
  createSelector(
    createMatchSelector('/userQuotas/:userQuotas_id'),
    (match) => {
      if (match && match.params) {
        return match.params.userQuotas_id;
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
        { name: 'Edit', path: `/users/${role.get('user')}/edit` },
        { name: 'Profile', path: `/users/${role.get('user')}/profile` },
        { name: 'Passwd', path: `/users/${role.get('user')}/passwd` },
        isAdmin ? { name: 'List', path: '/users' } : null,
      ].filter((n) => !!n)
  );

export const makeSelectLeftMenus = () =>
  createSelector(
    selectApp,
    makeSelectClusterID(),
    makeSelectCurrentNamespaceID(),
    makeSelectIsAdmin(),
    (appState, cluster, namespace, isAdmin) => {
      let menus = [{ name: 'Global', path: '/clusters', icon: OverviewIcon }];
      if (cluster !== '') {
        menus = menus.concat([
          {
            name: 'ClusterManagement',
            children: [
              { name: 'Overview', path: `/clusters/${cluster}/show` },
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
                name: 'StatefulSet',
                path: `/clusters/${cluster}/namespaces/${namespace}/statefulSets`,
              },
              {
                name: 'DaemonSet',
                path: `/clusters/${cluster}/namespaces/${namespace}/daemonSets`,
              },
              {
                name: 'CronJob',
                path: `/clusters/${cluster}/namespaces/${namespace}/cronJobs`,
              },
              {
                name: 'Job',
                path: `/clusters/${cluster}/namespaces/${namespace}/jobs`,
              },
              {
                name: 'ConfigMaps',
                path: `/clusters/${cluster}/namespaces/${namespace}/configmaps`,
              },
              {
                name: 'Secrets',
                path: `/clusters/${cluster}/namespaces/${namespace}/secrets`,
              },
            ],
            icon: ApplicationIcon,
          },
          {
            name: 'SystemManagement',
            children: [
              {
                name: 'Storages',
                path: `/clusters/${cluster}/storages`,
              },
              {
                name: 'Network',
                path: `/clusters/${cluster}/network`,
              },
              {
                name: 'ServiceLink',
                path: `/clusters/${cluster}/namespaces/${namespace}/serviceLink`,
              },
            ],
            icon: SystemIcon,
          },
        ]);
      }
      menus = menus.concat([
        {
          name: 'UserQuotas',
          path: isAdmin ? '/adminUserQuotas' : '/userQuotas',
          icon: UserQuotasIcon,
        },
      ]);
      menus = menus.concat([
        {
          name: 'ApplicationStore',
          path: '/applicationStore',
          icon: UserQuotasIcon,
        },
      ]);
      return menus;
    }
  );
