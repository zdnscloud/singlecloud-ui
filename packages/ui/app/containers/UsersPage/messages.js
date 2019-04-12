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
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleCreationTimestamp: {
    id: `${scope}.tableTitleCreationTimestamp`,
    defaultMessage: 'CreationTimestamp',
  },
  tableTitleLinks: {
    id: `${scope}.tableTitleLinks`,
    defaultMessage: 'Links',
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
});
