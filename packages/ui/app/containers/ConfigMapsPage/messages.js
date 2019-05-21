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
  tableTitleCount: {
    id: `${scope}.tableTitleCount`,
    defaultMessage: 'Count',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  createConfigMap: {
    id: `${scope}.createConfigMap`,
    defaultMessage: 'Create Config Map',
  },
  formName: {
    id: `${scope}.formName`,
    defaultMessage: 'Name',
  },
  formFiles: {
    id: `${scope}.formFiles`,
    defaultMessage: 'Files',
  },
  formFileName: {
    id: `${scope}.formFileName`,
    defaultMessage: 'FileName',
  },
  formFileContent: {
    id: `${scope}.formFileContent`,
    defaultMessage: 'FileContent',
  },
  formCreate: {
    id: `${scope}.formCreate`,
    defaultMessage: 'Create',
  },
  formEditFile: {
    id: `${scope}.formEditFile`,
    defaultMessage: 'Edit File Content',
  },
  formSetFile: {
    id: `${scope}.formSetFile`,
    defaultMessage: 'Set File Content',
  },
});
