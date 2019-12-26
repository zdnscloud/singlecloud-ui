/*
 * Ingress Messages
 *
 * This contains all the text for the Ingress container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Ingress';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Ingresses',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of Ingresses',
  },
  ingresses: {
    id: `${scope}.ingresses`,
    defaultMessage: 'ingresses',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleHost: {
    id: `${scope}.tableTitleHost`,
    defaultMessage: 'Host',
  },
  tableTitlePort: {
    id: `${scope}.tableTitlePort`,
    defaultMessage: 'Port',
  },
  tableTitleMaxBodySize: {
    id: `${scope}.tableTitleMaxBodySize`,
    defaultMessage: 'MaxBodySize',
  },
  tableTitleCreationTimestamp: {
    id: `${scope}.tableTitleCreationTimestamp`,
    defaultMessage: 'CreationTimestamp',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  createPageTitle: {
    id: `${scope}.createPageTitle`,
    defaultMessage: 'Create Ingress',
  },
  createPageDesc: {
    id: `${scope}.createPageDesc`,
    defaultMessage: 'Description of Create Ingress',
  },
  createIngress: {
    id: `${scope}.createIngress`,
    defaultMessage: 'Create Ingress',
  },
  configurationDetails: {
    id: `${scope}.configurationDetails`,
    defaultMessage: 'Configuration Details',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  cancle: {
    id: `${scope}.cancle`,
    defaultMessage: 'Cancle',
  },
  formName: {
    id: `${scope}.formName`,
    defaultMessage: 'Name',
  },
  formServiceName: {
    id: `${scope}.formServiceName`,
    defaultMessage: 'ServiceName',
  },
  formMaxBodySize: {
    id: `${scope}.formMaxBodySize`,
    defaultMessage: 'MaxBodySize',
  },
  formHost: {
    id: `${scope}.formHost`,
    defaultMessage: 'Host',
  },
  formPath: {
    id: `${scope}.formPath`,
    defaultMessage: 'Path',
  },
  formProtocol: {
    id: `${scope}.formProtocol`,
    defaultMessage: 'Protocol',
  },
  formServiceProtocol: {
    id: `${scope}.formServiceProtocol`,
    defaultMessage: 'ServiceProtocol',
  },
  formServicePort: {
    id: `${scope}.formServicePort`,
    defaultMessage: 'ServicePort',
  },
  formActions: {
    id: `${scope}.formActions`,
    defaultMessage: 'Actions',
  },
  ingressDetail: {
    id: `${scope}.ingressDetail`,
    defaultMessage: 'Ingress Detail',
  },
});
