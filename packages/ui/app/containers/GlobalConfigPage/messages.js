/*
 * GlobalConfig Messages
 *
 * This contains all the text for the GlobalConfig container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.GlobalConfig';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'GlobalConfig',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of GlobalConfig',
  },
  registries: {
    id: `${scope}.registries`,
    defaultMessage: 'registries',
  },
  formIngressDomain: {
    id: `${scope}.formIngressDomain`,
    defaultMessage: 'IngressDomain',
  },
  formCluster: {
    id: `${scope}.formCluster`,
    defaultMessage: 'Cluster',
  },
  formUser: {
    id: `${scope}.formUser`,
    defaultMessage: 'User',
  },
  repositoryServise: {
    id: `${scope}.repositoryServise`,
    defaultMessage: 'repositoryServise',
  },
});
