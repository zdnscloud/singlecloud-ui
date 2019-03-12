/*
 * ConfigMapsPage Messages
 *
 * This contains all the text for the ConfigMapsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ConfigMapsPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'ConfigMapsPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of ConfigMapsPage',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ConfigMapsPage container!',
  },
  configMaps: {
    id: `${scope}.configMaps`,
    defaultMessage: 'ConfigMaps',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
});
