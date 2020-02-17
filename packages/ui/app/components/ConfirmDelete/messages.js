/*
 * CommenDeletePage Messages
 *
 * This contains all the text for the CommenDeletePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.CommenDeletePage';

export default defineMessages({
  dialogTitle: {
    id: `${scope}.dialogTitle`,
    defaultMessage: 'Prompt',
  },
  dialogContentText: {
    id: `${scope}.dialogContentText`,
    defaultMessage:
      'This action permanently deletes the content. Continue or not？',
  },
  sureButton: {
    id: `${scope}.sureButton`,
    defaultMessage: 'sure',
  },
  cancleButton: {
    id: `${scope}.cancleButton`,
    defaultMessage: 'cancle',
  },
  deleteButton:{
    id: `${scope}.deleteButton`,
    defaultMessage: 'delete',
  },
});
