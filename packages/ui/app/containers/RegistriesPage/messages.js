/*
 * Registries Messages
 *
 * This contains all the text for the Registries container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Registries';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Registries',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of Registries',
  },
  registries: {
    id: `${scope}.registries`,
    defaultMessage: 'registries',
  },
  updatePageTitle: {
    id: `${scope}.updatePageTitle`,
    defaultMessage: 'Update Registry',
  },
  updatePageDesc: {
    id: `${scope}.updatePageDesc`,
    defaultMessage: 'Description of Update Registry',
  },
  updateRegistry: {
    id: `${scope}.updateRegistry`,
    defaultMessage: 'Update Registry',
  },
  update: {
    id: `${scope}.update`,
    defaultMessage: 'Update',
  },
});
