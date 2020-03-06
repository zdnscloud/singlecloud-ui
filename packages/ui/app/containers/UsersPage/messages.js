/*
 * UsersPage Messages
 *
 * This contains all the text for the UsersPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UsersPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'This is the UsersPage title!',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'This is the UsersPage description!',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the UsersPage header!',
  },
  users: {
    id: `${scope}.users`,
    defaultMessage: 'Users',
  },
  usersList: {
    id: `${scope}.usersList`,
    defaultMessage: 'usersList',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleCreationTimestamp: {
    id: `${scope}.tableTitleCreationTimestamp`,
    defaultMessage: 'CreationTimestamp',
  },
  tableTitleProjects: {
    id: `${scope}.tableTitleProjects`,
    defaultMessage: 'Projects',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  createUser: {
    id: `${scope}.createUser`,
    defaultMessage: 'Create User',
  },
  editUser: {
    id: `${scope}.editUser`,
    defaultMessage: 'Edit User',
  },
  userProfile: {
    id: `${scope}.userProfile`,
    defaultMessage: 'User Profile',
  },
  passwordSetup: {
    id: `${scope}.passwordSetup`,
    defaultMessage: 'Password Setup',
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'username',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'password',
  },
  oldPassword: {
    id: `${scope}.oldPassword`,
    defaultMessage: 'oldPassword',
  },
  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'newPassword',
  },
  updatePassword: {
    id: `${scope}.updatePassword`,
    defaultMessage: 'updatePassword',
  },
  clusterAllNamespaces: {
    id: `${scope}.clusterAllNamespaces`,
    defaultMessage: "cluster {cluster}'s all namespace",
  },
  clusterNamespace: {
    id: `${scope}.clusterNamespace`,
    defaultMessage: "cluster {cluster}'s namespace {namespace}",
  },
  updateUser: {
    id: `${scope}.updateUser`,
    defaultMessage: 'Update User',
  },
  createUserButton: {
    id: `${scope}.createUserButton`,
    defaultMessage: 'Craete User',
  },
  editButton: {
    id: `${scope}.editButton`,
    defaultMessage: 'edit',
  },
});
