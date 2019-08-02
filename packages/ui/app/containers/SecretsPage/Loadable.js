/**
 *
 * Asynchronously loads the component for SecretsPage
 *
 */

import loadable from '@loadable/component';

export default loadable(() =>
  import(/* webpackChunkName: "SecretsPage" */ './index')
);

export const CreateSecretPage = loadable(() =>
  import(/* webpackChunkName: "CreateSecretPage" */ './CreateSecretPage')
);

export const ShowSecretPage = loadable(() =>
  import(/* webpackChunkName: "ShowSecretPage" */ './ShowSecretPage')
);

export const EditSecretPage = loadable(() =>
  import(/* webpackChunkName: "EditSecretPage" */ './EditSecretPage')
);
