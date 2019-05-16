/*
 * NetworkPage Messages
 *
 * This contains all the text for the NetworkPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NetworkPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'NetworkPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of NetworkPage',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NetworkPage container!',
  },
  network: {
    id: `${scope}.network`,
    defaultMessage: 'Network',
  },
  serviceIP: {
    id: `${scope}.service`,
    defaultMessage: 'Service IP',
  },
  podIP: {
    id: `${scope}.pod`,
    defaultMessage: 'Pod IP',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleIp: {
    id: `${scope}.tableTitleIp`,
    defaultMessage: 'IP',
  },
  nodeName: {
    id: `${scope}.nodeName`,
    defaultMessage: 'Node Name',
  },
  podCIDR: {
    id: `${scope}.podCIDR`,
    defaultMessage: 'Pod CIDR',
  },
  total: {
    id: `${scope}.total`,
    defaultMessage: 'Total Addresses',
  },
  used: {
    id: `${scope}.used`,
    defaultMessage: 'Used Addresses',
  },
  unused: {
    id: `${scope}.unused`,
    defaultMessage: 'Unused Addresses',
  },
  activeIP: {
    id: `${scope}.activeIP`,
    defaultMessage: 'IP',
  },
  activePod: {
    id: `${scope}.activePod`,
    defaultMessage: 'Pod',
  },
});
