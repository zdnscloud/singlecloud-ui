/*
 * UserQuotasPage Messages
 *
 * This contains all the text for the UserQuotasPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UserQuotasPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'UserQuotasPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of UserQuotasPage',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the UserQuotasPage container!',
  },
  userQuotas: {
    id: `${scope}.userQuotas`,
    defaultMessage: 'userQuotas',
  },
});
