/*
 * Registries Messages
 *
 * This contains all the text for the Registries container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Registries';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Registries',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of Registries',
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
  openRegistry: {
    id: `${scope}.openRegistry`,
    defaultMessage: 'Open Registry',
  },
  pending: {
    id: `${scope}.pending`,
    defaultMessage: 'Pending',
  }
});
