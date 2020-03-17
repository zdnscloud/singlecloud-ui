/*
 * Error Dialog Messages
 *
 * This contains all the text for the Dialog componets.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ErrorDialog';

export default defineMessages({
  dialogTitle: {
    id: `${scope}.dialogTitle`,
    defaultMessage: 'Error',
  },
  connectionFailed: {
    id: `${scope}.connectionFailed`,
    defaultMessage: 'connectionFailed',
  },
});
