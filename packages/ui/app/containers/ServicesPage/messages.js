/*
 * ServicesPage Messages
 *
 * This contains all the text for the ServicesPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ServicesPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'ServicesPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of ServicesPage',
  },
  services: {
    id: `${scope}.services`,
    defaultMessage: 'services',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleServiceType: {
    id: `${scope}.tableTitleServiceType`,
    defaultMessage: 'ServiceType',
  },
  tableTitleClusterIP: {
    id: `${scope}.tableTitleClusterIP`,
    defaultMessage: 'ClusterIP',
  },
  tableTitleExposedPorts: {
    id: `${scope}.tableTitleExposedPorts`,
    defaultMessage: 'ExposedPorts',
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
    defaultMessage: 'Create Service',
  },
  createPageDesc: {
    id: `${scope}.createPageDesc`,
    defaultMessage: 'Description of Create Service',
  },
  createService: {
    id: `${scope}.createService`,
    defaultMessage: 'Create Service',
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
  formVip: {
    id: `${scope}.formVip`,
    defaultMessage: 'Vip',
  },
  formTargetResourceType: {
    id: `${scope}.formTargetResourceType`,
    defaultMessage: 'TargetResourceType',
  },
  formTargetName: {
    id: `${scope}.formTargetName`,
    defaultMessage: 'TargetName',
  },
  formServiceType: {
    id: `${scope}.formServiceType`,
    defaultMessage: 'ServiceType',
  },
  formHash: {
    id: `${scope}.formHash`,
    defaultMessage: 'Hash',
  },
  formPolling: {
    id: `${scope}.formPolling`,
    defaultMessage: 'Polling',
  },
  formMinNum: {
    id: `${scope}.formMinNum`,
    defaultMessage: 'Minimum number of connections',
  },
  formLoadBalanceMethod: {
    id: `${scope}.formLoadBalanceMethod`,
    defaultMessage: 'LoadBalanceMethod',
  },
  formExposedPorts: {
    id: `${scope}.formExposedPorts`,
    defaultMessage: 'ExposedPorts',
  },
  formExposedPortEnable: {
    id: `${scope}.formExposedPortEnable`,
    defaultMessage: 'ExposedPortEnable',
  },
  formExposedPort: {
    id: `${scope}.formExposedPort`,
    defaultMessage: 'ExposedPort',
  },
  formExposedPortName: {
    id: `${scope}.formExposedPortName`,
    defaultMessage: 'ExposedPortName',
  },
  formExposedPortTarget: {
    id: `${scope}.formExposedPortTarget`,
    defaultMessage: 'ExposedPortTarget',
  },
  formExposedPortProtocol: {
    id: `${scope}.formExposedPortProtocol`,
    defaultMessage: 'ExposedPortProtocol',
  },
  showItemPageTitle: {
    id: `${scope}.showItemPageTitle`,
    defaultMessage: 'Show Service',
  },
  showItemPageDesc: {
    id: `${scope}.showItemPageDesc`,
    defaultMessage: 'Description of Show Service',
  },
  showService: {
    id: `${scope}.showService`,
    defaultMessage: 'Show Service',
  },
  successTitle: {
    id: `${scope}.successTitle`,
    defaultMessage: 'Notice',
  },
  successContent: {
    id: `${scope}.successContent`,
    defaultMessage:
      'Service has been created, would you like to create a ingress for it?',
  },
});
