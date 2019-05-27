/*
 * NodesPage Messages
 *
 * This contains all the text for the NodesPage container.
 */

import { defineMessages } from 'react-intl';

import tableSchema from './tableSchema';

export const scope = 'app.containers.NodesPage';

// eslint-disable-next-line
const table = tableSchema.reduce(
  (schema, col) => ({
    [`tableTitle${col.label}`]: {
      id: `${scope}.tableTitle${col.label}`,
      defaultMessage: col.label,
    },
    ...schema,
  }),
  {}
);

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'This is the NodesPage title!',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'This is the NodesPage description!',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NodesPage header!',
  },
  nodes: {
    id: `${scope}.nodes`,
    defaultMessage: 'Nodes',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleAddress: {
    id: `${scope}.tableTitleAddress`,
    defaultMessage: 'Address',
  },
  tableTitleRoles: {
    id: `${scope}.tableTitleRoles`,
    defaultMessage: 'Role',
  },
  tableTitleLabels: {
    id: `${scope}.tableTitleLabels`,
    defaultMessage: 'Labels',
  },
  tableTitleCreationTimestamp: {
    id: `${scope}.tableTitleCreationTimestamp`,
    defaultMessage: 'CreationTimestamp',
  },
});
