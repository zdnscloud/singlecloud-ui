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
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ServicesPage container!',
  },
  services: {
    id: `${scope}.services`,
    defaultMessage: 'Services',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleServiceType: {
    id: `${scope}.tableTitleServiceType`,
    defaultMessage: 'ServiceType',
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
});
