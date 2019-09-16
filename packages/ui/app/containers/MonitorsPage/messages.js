/*
 * Monitors Messages
 *
 * This contains all the text for the Monitors container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Monitors';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Monitors',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of Monitors',
  },
  monitors: {
    id: `${scope}.monitors`,
    defaultMessage: 'monitors',
  },
  clusterMonitor: {
    id: `${scope}.clusterMonitor`,
    defaultMessage: 'Cluster Monitor',
  },
  open: {
    id: `${scope}.open`,
    defaultMessage: 'Open',
  },
  openMonitor: {
    id: `${scope}.openMonitor`,
    defaultMessage: 'Open Monitor',
  },
  pending: {
    id: `${scope}.pending`,
    defaultMessage: 'Pending',
  },
  applicationLink: {
    id: `${scope}.applicationLink`,
    defaultMessage: 'Link Application',
  },
});
