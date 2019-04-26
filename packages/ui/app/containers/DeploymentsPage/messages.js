/*
 * DeploymentsPage Messages
 *
 * This contains all the text for the DeploymentsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DeploymentsPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'DeploymentsPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of DeploymentsPage',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the DeploymentsPage container!',
  },
  deployments: {
    id: `${scope}.deployments`,
    defaultMessage: 'Deployments',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  createDeployment: {
    id: `${scope}.createDeployment`,
    defaultMessage: 'Create Deployment',
  },
});
