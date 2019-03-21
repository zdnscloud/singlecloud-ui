/*
 * PodsPage Messages
 *
 * This contains all the text for the PodsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.PodsPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'PodsPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of PodsPage',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the PodsPage container!',
  },
  pods: {
    id: `${scope}.pods`,
    defaultMessage: 'Pods',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
});
