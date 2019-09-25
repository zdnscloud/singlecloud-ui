import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';

import OverviewIcon from 'components/Icons/Overview';
import ManagementIcon from 'components/Icons/Management';
import BasicResourcesIcon from 'components/Icons/BasicResources';
import SystemIcon from 'components/Icons/System';
import UserQuotasIcon from 'components/Icons/UserQuotas';
import ApplicationStoreIcon from 'components/Icons/ApplicationStore';
import { makeSelectRole, makeSelectIsAdmin } from 'ducks/role/selectors';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';

import { prefix } from './constants';

const selectRouter = (state) => state.get('router');

export const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    (routerState) => routerState.get('location')
  );

const selectDomain = (state) => state.get('app');

export const makeSelectShowMenuText = () =>
  createSelector(
    selectDomain,
    (appState) => appState.get('showMenuText')
  );

export const makeSelectShowEvents = () =>
  createSelector(
    selectDomain,
    createMatchSelector('/clusters/:cluster_id/:mode'),
    (appState, match) => {
      let inEventsPage = false;
      if (match && match.params) {
        inEventsPage = match.params.mode === 'events';
      }
      return appState.get('showEvents') && !inEventsPage;
    }
  );

export const makeSelectLastNamespace = () =>
  createSelector(
    selectDomain,
    (appState) => appState.get('lastNamespace')
  );

export const makeSelectUserMenus = () =>
  createSelector(
    selectDomain,
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
    selectDomain,
    makeSelectLocation(),
    makeSelectCurrentClusterID(),
    makeSelectLastNamespace(),
    makeSelectIsAdmin(),
    (appState, location, cluster, nsID, isAdmin) => {
      const namespace = nsID || 'default';
      let menus = [
        {
          name: 'Global',
          children: [{ name: 'ClusterList', path: `/clusters` }],
          icon: OverviewIcon,
        },
      ];
      const path = location.get('pathname');
      const isManage = /^\/clusters\/[^/]+\/manage/.test(path);
      if (cluster !== '' && !isManage) {
        menus = menus.concat([
          {
            name: 'ClusterManagement',
            children: [
              { name: 'ClusterOverview', path: `/clusters/${cluster}/show` },
              { name: 'Namespaces', path: `/clusters/${cluster}/namespaces` },
              { name: 'Nodes', path: `/clusters/${cluster}/nodes` },
              {
                name: 'Storages',
                path: `/clusters/${cluster}/storageClusters`,
              },
              {
                name: 'Network',
                path: `/clusters/${cluster}/network`,
              },
            ],
            icon: ManagementIcon,
          },
          // {
          //   name: 'ContainerManagement',
          //   children: [
          //     {
          //       name: 'ContainerWatch',
          //       path: `/clusters/${cluster}/container-watch`,
          //     },
          //     {
          //       name: 'ImageManagement',
          //       path: `/clusters/${cluster}/image-management`,
          //     },
          //   ],
          //   icon: SystemIcon,
          // },
          {
            name: 'AppStore',
            children: [
              {
                name: 'LocalAppTemplates',
                path: `/clusters/${cluster}/namespaces/${namespace}/charts`,
              },
            ],
            icon: ApplicationStoreIcon,
          },
          {
            name: 'AppManagement',
            children: [
              {
                name: 'Applications',
                path: `/clusters/${cluster}/namespaces/${namespace}/applications`,
              },
              {
                name: 'ServiceLink',
                path: `/clusters/${cluster}/namespaces/${namespace}/serviceLink`,
              },
            ],
            icon: SystemIcon,
          },
          {
            name: 'BasicResources',
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
              {
                name: 'Services',
                path: `/clusters/${cluster}/namespaces/${namespace}/services`,
              },
              {
                name: 'Ingresses',
                path: `/clusters/${cluster}/namespaces/${namespace}/ingresses`,
              },
              {
                name: 'UdpIngresses',
                path: `/clusters/${cluster}/namespaces/${namespace}/udpIngresses`,
              },
            ],
            icon: BasicResourcesIcon,
          },
        ]);
      }
      menus = menus.concat([
        {
          name: 'UserQuotas',
          children: [
            {
              name: 'UserQuotasList',
              path: isAdmin ? '/adminUserQuotas' : '/userQuotas',
            },
          ],
          icon: UserQuotasIcon,
        },
      ]);

      return menus;
    }
  );
