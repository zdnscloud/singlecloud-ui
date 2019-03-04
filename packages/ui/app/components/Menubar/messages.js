/*
 * Menubar Messages
 *
 * This contains all the text for the Menubar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Menubar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Menubar component!',
  },
});
