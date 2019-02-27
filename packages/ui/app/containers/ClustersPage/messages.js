/*
 * ClustersPage Messages
 *
 * This contains all the text for the ClustersPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ClustersPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'This is the ClustersPage title!',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'This is the ClustersPage description!',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ClustersPage header!',
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
