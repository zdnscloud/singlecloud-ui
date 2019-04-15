/*
 * TopologyPage Messages
 *
 * This contains all the text for the TopologyPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TopologyPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'TopologyPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of TopologyPage',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the TopologyPage container!',
  },
  topology: {
    id: `${scope}.topology`,
    defaultMessage: 'Topology',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
});
