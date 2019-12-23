/*
 * MetricsPage Messages
 *
 * This contains all the text for the MetricsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MetricsPage';

export default defineMessages({
  metricBtn: {
    id: `${scope}.metricBtn`,
    defaultMessage: 'Metric',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of MetricsPage',
  },
  metrics: {
    id: `${scope}.metrics`,
    defaultMessage: 'metrics',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleCreationTimestamp: {
    id: `${scope}.tableTitleCreationTimestamp`,
    defaultMessage: 'CreationTimestamp',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
});
