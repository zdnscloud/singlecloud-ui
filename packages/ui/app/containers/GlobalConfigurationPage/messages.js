/*
 * GlobalConfigurationPage Messages
 *
 * This contains all the text for the GlobalConfigurationPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.GlobalConfigurationPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'GlobalConfigurationPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of GlobalConfigurationPage',
  },
  alarms: {
    id: `${scope}.alarms`,
    defaultMessage: 'alarms',
  },
  clusterThreshold: {
    id: `${scope}.clusterThreshold`,
    defaultMessage: 'Cluster Threshold',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  formCPU: {
    id: `${scope}.formCPU`,
    defaultMessage: 'CPU',
  },
  formMemory: {
    id: `${scope}.formMemory`,
    defaultMessage: 'Memory',
  },
  formStorage: {
    id: `${scope}.formStorage`,
    defaultMessage: 'Storage',
  },
  formPodCount: {
    id: `${scope}.formPodCount`,
    defaultMessage: 'Pod Count',
  },
  formMailTo: {
    id: `${scope}.formMailTo`,
    defaultMessage: 'Mail To',
  },
  formMailFrom: {
    id: `${scope}.formMailFrom`,
    defaultMessage: 'Mail From',
  },
  formPassword: {
    id: `${scope}.formPassword`,
    defaultMessage: 'Password',
  },
  formSMTP: {
    id: `${scope}.formSMTP`,
    defaultMessage: 'SMTP',
  },
  formSMTPPort: {
    id: `${scope}.formSMTPPort`,
    defaultMessage: 'SMTP Port',
  },
  leftMenuDialogTitle: {
    id: `${scope}.leftMenuDialogTitle`,
    defaultMessage: 'Dialog Title',
  },
  leftMenuDialogContent: {
    id: `${scope}.leftMenuDialogContent`,
    defaultMessage: 'Save success！',
  },
});
