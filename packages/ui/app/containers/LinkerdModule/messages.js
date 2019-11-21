/*
 * Linkerd Messages
 *
 * This contains all the text for the App container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Linkerd';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Linkerd',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of Linkerd',
  },
  titleEdges: {
    id: `${scope}.titleEdges`,
    defaultMessage: 'titleEdges',
  },
  titleEdgesIdentity: {
    id: `${scope}.titleEdgesIdentity`,
    defaultMessage: 'titleEdges (Identity: {identity})',
  },
  titleDeployment: {
    id: `${scope}.titleDeployment`,
    defaultMessage: 'titleDeployment',
  },
  titleDaemonset: {
    id: `${scope}.titleDaemonset`,
    defaultMessage: 'titleDaemonset',
  },
  titleStatefulset: {
    id: `${scope}.titleStatefulset`,
    defaultMessage: 'titleStatefulset',
  },
  titlePod: {
    id: `${scope}.titlePod`,
    defaultMessage: 'titlePod',
  },
  titleTCP: {
    id: `${scope}.titleTCP`,
    defaultMessage: 'titleTCP',
  },
  titlePods: {
    id: `${scope}.titlePods`,
    defaultMessage: 'titlePods',
  },
  titleInbound: {
    id: `${scope}.titleInbound`,
    defaultMessage: 'titleInbound',
  },
  titleOutbound: {
    id: `${scope}.titleOutbound`,
    defaultMessage: 'titleOutbound',
  },
  titleHTTPmetrics: {
    id: `${scope}.titleHTTPmetrics`,
    defaultMessage: 'titleHTTPmetrics',
  },
  titleTCPmetrics: {
    id: `${scope}.titleTCPmetrics`,
    defaultMessage: 'titleTCPmetrics',
  },
  colApexService: {
    id: `${scope}.colApexService`,
    defaultMessage: 'colApexService',
  },
  colBest: {
    id: `${scope}.colBest`,
    defaultMessage: 'colBest',
  },
  colConnections: {
    id: `${scope}.colConnections`,
    defaultMessage: 'colConnections',
  },
  colCount: {
    id: `${scope}.colCount`,
    defaultMessage: 'colCount',
  },
  colDeployment: {
    id: `${scope}.colDeployment`,
    defaultMessage: 'colDeployment',
  },
  colDestination: {
    id: `${scope}.colDestination`,
    defaultMessage: 'colDestination',
  },
  colDirection: {
    id: `${scope}.colDirection`,
    defaultMessage: 'colDirection',
  },
  colGRPCstatus: {
    id: `${scope}.colGRPCstatus`,
    defaultMessage: 'colGRPCstatus',
  },
  colGrafana: {
    id: `${scope}.colGrafana`,
    defaultMessage: 'colGrafana',
  },
  colHTTPstatus: {
    id: `${scope}.colHTTPstatus`,
    defaultMessage: 'colHTTPstatus',
  },
  colIdentity: {
    id: `${scope}.colIdentity`,
    defaultMessage: 'colIdentity',
  },
  colLast: {
    id: `${scope}.colLast`,
    defaultMessage: 'colLast',
  },
  colLatency: {
    id: `${scope}.colLatency`,
    defaultMessage: 'colLatency',
  },
  colLeafService: {
    id: `${scope}.colLeafService`,
    defaultMessage: 'colLeafService',
  },
  colMeshed: {
    id: `${scope}.colMeshed`,
    defaultMessage: 'colMeshed',
  },
  colMeshedPods: {
    id: `${scope}.colMeshedPods`,
    defaultMessage: 'colMeshedPods',
  },
  colMeshedStatus: {
    id: `${scope}.colMeshedStatus`,
    defaultMessage: 'colMeshedStatus',
  },
  colMethod: {
    id: `${scope}.colMethod`,
    defaultMessage: 'colMethod',
  },
  colName: {
    id: `${scope}.colName`,
    defaultMessage: 'colName',
  },
  colNamespace: {
    id: `${scope}.colNamespace`,
    defaultMessage: 'colNamespace',
  },
  colP50Latency: {
    id: `${scope}.colP50Latency`,
    defaultMessage: 'colP50Latency',
  },
  colP95Latency: {
    id: `${scope}.colP95Latency`,
    defaultMessage: 'colP95Latency',
  },
  colP99Latency: {
    id: `${scope}.colP99Latency`,
    defaultMessage: 'colP99Latency',
  },
  colPath: {
    id: `${scope}.colPath`,
    defaultMessage: 'colPath',
  },
  colPods: {
    id: `${scope}.colPods`,
    defaultMessage: 'colPods',
  },
  colRPS: {
    id: `${scope}.colRPS`,
    defaultMessage: 'colRPS',
  },
  colReadBytessec: {
    id: `${scope}.colReadBytessec`,
    defaultMessage: 'colReadBytessec',
  },
  colResource: {
    id: `${scope}.colResource`,
    defaultMessage: 'colResource',
  },
  colRoute: {
    id: `${scope}.colRoute`,
    defaultMessage: 'colRoute',
  },
  colSecured: {
    id: `${scope}.colSecured`,
    defaultMessage: 'colSecured',
  },
  colService: {
    id: `${scope}.colService`,
    defaultMessage: 'colService',
  },
  colSource: {
    id: `${scope}.colSource`,
    defaultMessage: 'colSource',
  },
  colSuccessRate: {
    id: `${scope}.colSuccessRate`,
    defaultMessage: 'colSuccessRate',
  },
  colTap: {
    id: `${scope}.colTap`,
    defaultMessage: 'colTap',
  },
  colValue: {
    id: `${scope}.colValue`,
    defaultMessage: 'colValue',
  },
  colWeight: {
    id: `${scope}.colWeight`,
    defaultMessage: 'colWeight',
  },
  colWorst: {
    id: `${scope}.colWorst`,
    defaultMessage: 'colWorst',
  },
  colWriteBytessec: {
    id: `${scope}.colWriteBytessec`,
    defaultMessage: 'colWriteBytessec',
  },
  labelLiveCalls: {
    id: `${scope}.labelLiveCalls`,
    defaultMessage: 'labelLiveCalls',
  },
  labelRouteMetrics: {
    id: `${scope}.labelRouteMetrics`,
    defaultMessage: 'labelRouteMetrics',
  },
  labelNoTraffic: {
    id: `${scope}.labelNoTraffic`,
    defaultMessage: 'labelNoTraffic',
  },
  labelMeshed: {
    id: `${scope}.labelMeshed`,
    defaultMessage: 'labelMeshed',
  },
  labelUnmeshed: {
    id: `${scope}.labelUnmeshed`,
    defaultMessage: 'labelUnmeshed',
  },
  cellWeight: {
    id: `${scope}.cellWeight`,
    defaultMessage: 'cellWeight',
  },
  cellSR: {
    id: `${scope}.cellSR`,
    defaultMessage: 'cellSR',
  },
  cellRPS: {
    id: `${scope}.cellRPS`,
    defaultMessage: 'cellRPS',
  },
  cellP99: {
    id: `${scope}.cellP99`,
    defaultMessage: 'cellP99',
  },
  cellConn: {
    id: `${scope}.cellConn`,
    defaultMessage: 'cellConn',
  },
  cellRead: {
    id: `${scope}.cellRead`,
    defaultMessage: 'cellRead',
  },
  cellWrite: {
    id: `${scope}.cellWrite`,
    defaultMessage: 'cellWrite',
  },
  cardUnmeshed: {
    id: `${scope}.cardUnmeshed`,
    defaultMessage: 'cardUnmeshed',
  },
});
