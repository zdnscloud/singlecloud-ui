/*
 * NamespacesPage Messages
 *
 * This contains all the text for the NamespacesPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NamespacesPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'This is the NamespacesPage title!',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'This is the NamespacesPage description!',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NamespacesPage header!',
  },
  namespace: {
    id: `${scope}.namespace`,
    defaultMessage: 'Namespace',
  },
  namespaces: {
    id: `${scope}.namespaces`,
    defaultMessage: 'Namespaces',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleCreationTimestamp: {
    id: `${scope}.tableTitleCreationTimestamp`,
    defaultMessage: 'CreationTimestamp',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  createNamespace: {
    id: `${scope}.createNamespace`,
    defaultMessage: 'Create Namespace',
  },
  formName: {
    id: `${scope}.formName`,
    defaultMessage: 'Name',
  },
  createNamespaceButton: {
    id: `${scope}.createNamespaceButton`,
    defaultMessage: 'Create Namespace',
  },
});
