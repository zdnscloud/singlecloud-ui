/*
 * SecretsPage Messages
 *
 * This contains all the text for the SecretsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SecretsPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'SecretsPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of SecretsPage',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SecretsPage container!',
  },
  secrets: {
    id: `${scope}.secrets`,
    defaultMessage: 'Secrets',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleCount: {
    id: `${scope}.tableTitleCount`,
    defaultMessage: 'Count',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  createSecret: {
    id: `${scope}.createSecret`,
    defaultMessage: 'Create Config Map',
  },
  editSecret: {
    id: `${scope}.editSecret`,
    defaultMessage: 'EditSecret',
  },
  formName: {
    id: `${scope}.formName`,
    defaultMessage: 'Name',
  },
  formData: {
    id: `${scope}.formData`,
    defaultMessage: 'Data',
  },
  formDataKey: {
    id: `${scope}.formDataKey`,
    defaultMessage: 'DataKey',
  },
  formDataValue: {
    id: `${scope}.formDataValue`,
    defaultMessage: 'DataValue',
  },
  formCreate: {
    id: `${scope}.formCreate`,
    defaultMessage: 'Create',
  },
  formCancle: {
    id: `${scope}.cancle`,
    defaultMessage: 'Cancle',
  },
  formEditFile: {
    id: `${scope}.formEditFile`,
    defaultMessage: 'Edit File Content',
  },
  formSetFile: {
    id: `${scope}.formSetFile`,
    defaultMessage: 'Set File Content',
  },
  showSecret: {
    id: `${scope}.showSecret`,
    defaultMessage: 'Show Config Map',
  },
  formCloseFile: {
    id: `${scope}.formCloseFile`,
    defaultMessage: 'Close File Content',
  },
  formShowFile: {
    id: `${scope}.formShowFile`,
    defaultMessage: 'Show File Content',
  },
  editButton: {
    id: `${scope}.editButton`,
    defaultMessage: 'edit',
  },
});
