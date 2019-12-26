/*
 * SvcMeshTapPage Messages
 *
 * This contains all the text for the SvcMeshTapPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SvcMeshTapPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'SvcMeshTapPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of SvcMeshTapPage',
  },
  formFrom: {
    id: `${scope}.formFrom`,
    defaultMessage: 'formFrom',
  },
  formTo: {
    id: `${scope}.formTo`,
    defaultMessage: 'formTo',
  },
  formMethod: {
    id: `${scope}.formMethod`,
    defaultMessage: 'formMethod',
  },
  formPath: {
    id: `${scope}.formPath`,
    defaultMessage: 'formPath',
  },
  tapStart: {
    id: `${scope}.tapStart`,
    defaultMessage: 'tapStart',
  },
  tapStop: {
    id: `${scope}.tapStop`,
    defaultMessage: 'tapStop',
  },
  tapReset: {
    id: `${scope}.tapReset`,
    defaultMessage: 'tapReset',
  },
  tableTitleSelf: {
    id: `${scope}.tableTitleSelf`,
    defaultMessage: ' ',
  },
  tableTitleProxyDirection: {
    id: `${scope}.tableTitleProxyDirection`,
    defaultMessage: 'ProxyDirection',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleMethod: {
    id: `${scope}.tableTitleMethod`,
    defaultMessage: 'Method',
  },
  tableTitlePath: {
    id: `${scope}.tableTitlePath`,
    defaultMessage: 'Path',
  },
  tableTitleLatency: {
    id: `${scope}.tableTitleLatency`,
    defaultMessage: 'Latency',
  },
  tableTitleHttpStatus: {
    id: `${scope}.tableTitleHttpStatus`,
    defaultMessage: 'HttpStatus',
  },
  tableTitleGrpcStatus: {
    id: `${scope}.tableTitleGrpcStatus`,
    defaultMessage: 'GrpcStatus',
  },
  tableDirectionSource: {
    id: `${scope}.tableDirectionSource`,
    defaultMessage: 'Source',
  },
  tableDirectionTarget: {
    id: `${scope}.tableDirectionTarget`,
    defaultMessage: 'Target',
  },
});
