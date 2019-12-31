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
  tableTitleLabels: {
    id: `${scope}.tableTitleLabels`,
    defaultMessage: 'Labels',
  },
  tableTitleValue: {
    id: `${scope}.tableTitleValue`,
    defaultMessage: 'Value',
  },
  setHPABtn: {
    id: `${scope}.setHPABtn`,
    defaultMessage: 'Set HPA',
  },
});
