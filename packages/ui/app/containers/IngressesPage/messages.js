/*
 * IngressesPage Messages
 *
 * This contains all the text for the IngressesPage container.
 */

import { defineMessages } from 'react-intl';

import tableSchema from './tableSchema';

export const scope = 'app.containers.IngressesPage';

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
    defaultMessage: 'This is the IngressesPage title!',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'This is the IngressesPage description!',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the IngressesPage header!',
  },
  ingresses: {
    id: `${scope}.ingresses`,
    defaultMessage: 'Ingresses',
  },
});
