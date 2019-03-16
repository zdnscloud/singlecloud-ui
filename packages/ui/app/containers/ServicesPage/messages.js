/*
 * ServicesPage Messages
 *
 * This contains all the text for the ServicesPage container.
 */

import { defineMessages } from 'react-intl';

import tableSchema from './tableSchema';

export const scope = 'app.containers.ServicesPage';

// eslint-disable-next-line
const table = tableSchema.reduce(
  (schema, col) => ({
    [`tableTitle${col.label}`]: {
      id: `${scope}.tableTitle${col.label}`,
      defaultMessage: col.label,
    },
    ...schema,
  }),
  {},
);

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'This is the ServicesPage title!',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'This is the ServicesPage description!',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ServicesPage header!',
  },
  services: {
    id: `${scope}.services`,
    defaultMessage: 'Services',
  },
});
