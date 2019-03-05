/*
 * TerminalPage Messages
 *
 * This contains all the text for the TerminalPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TerminalPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'TerminalPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of TerminalPage',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the TerminalPage container!',
  },
});
