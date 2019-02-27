/*
 * NodesPage Messages
 *
 * This contains all the text for the NodesPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NodesPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'This is the NodesPage title!',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'This is the NodesPage description!',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NodesPage header!',
  },
  table: {
    title: {
      name: {
        id: `${scope}.table.title.name`,
        defaultMessage: 'Name',
      },
      nodeCounts: {
        id: `${scope}.table.title.nodeCounts`,
        defaultMessage: 'NodeCounts',
      },
    },
  },
});
