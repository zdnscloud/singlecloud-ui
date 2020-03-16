/*
 * CommenDeletePage Messages
 *
 * This contains all the text for the CommenConfirmPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.CommenConfirmPage';

export default defineMessages({
  dialogTitle: {
    id: `${scope}.dialogTitle`,
    defaultMessage: 'Prompt',
  },
  sureButton: {
    id: `${scope}.sureButton`,
    defaultMessage: 'sure',
  },
  cancleButton: {
    id: `${scope}.cancleButton`,
    defaultMessage: 'cancle',
  },
  saveFailed:{
    id: `${scope}.saveFailed`,
    defaultMessage: 'Save Failed',
  },
});
