/*
 * ServiceLinkPage Messages
 *
 * This contains all the text for the ServiceLinkPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ServiceLinkPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'ServiceLinkPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of ServiceLinkPage',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ServiceLinkPage container!',
  },
  topology: {
    id: `${scope}.topology`,
    defaultMessage: 'ServiceLink',
  },
  outerServices: {
    id: `${scope}.outerServices`,
    defaultMessage: 'Ouser Services',
  },
  innerServices: {
    id: `${scope}.innerServices`,
    defaultMessage: 'Inner Services',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  outerServiceName: {
    id: `${scope}.outerServiceName`,
    defaultMessage: 'Service Name',
  },
  innerServiceName: {
    id: `${scope}.innerServiceName`,
    defaultMessage: 'Service Name',
  },
});
