/*
 * ApplicationStorePage Messages
 *
 * This contains all the text for the ApplicationStorePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ApplicationStorePage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'ApplicationStorePage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of ApplicationStorePage',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ApplicationStorePage container!',
  },
  applicationStore: {
    id: `${scope}.applicationStore`,
    defaultMessage: 'ApplicationStore',
  },
  tableTitleNamespace: {
    id: `${scope}.tableTitleNamespace`,
    defaultMessage: 'Namespace',
  },
  createApplication: {
    id: `${scope}.createApplication`,
    defaultMessage: 'Create Application',
  },
  createApplicationButton: {
    id: `${scope}.createApplicationButton`,
    defaultMessage: 'Save',
  },
  cancleApplicationButton: {
    id: `${scope}.cancleApplicationButton`,
    defaultMessage: 'Cancle',
  },
  searchFormApplicationName: {
    id: `${scope}.searchFormApplicationName`,
    defaultMessage: 'ApplicationName',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  formAddContainer: {
    id: `${scope}.formAddContainer`,
    defaultMessage: 'AddContainer',
  },
  formNamespace: {
    id: `${scope}.formNamespace`,
    defaultMessage: 'Namespace',
  },

});
