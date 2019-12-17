import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import IconButton from 'components/CustomIconButtons/IconButton';
import DebugIcon from 'components/Icons/Debug';
import classNames from 'classnames';

const schema = [
  'pods',
  'resource',
  'meshed',
  'successRate',
  'RPS',
  'latencyMsP50',
  'latencyMsP95',
  'latencyMsP99',
  'connections',
  'readBytes',
  'writeBytes',
];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .concat([
    {
      id: 'actions',
      label: 'Actions',
      component: ({ clusterID, namespaceID, data }) => (
        <Fragment>
          <IconButton
            component={Link}
            to={`/clusters/${clusterID}/namespaces/${namespaceID}/workloadGroup/${data.get(
              'id'
            )}/show`}
          >
            <DebugIcon />
          </IconButton>
        </Fragment>
      ),
    },
  ])
  .map((sch) => {
    if (sch.id === 'pods') {
      return {
        ...sch,
        component: ({
          clusterID,
          namespaceID,
          data,
          svcMeshWorkloadGroupID,
          svcMeshWorkloadID,
        }) => (
          <Button
            link
            component={Link}
            to={`/clusters/${clusterID}/namespaces/${namespaceID}/svcMeshWorkloadGroups/${svcMeshWorkloadGroupID}/svcmeshworkloads/${svcMeshWorkloadID}/svcmeshpods/${data.get(
              'id'
            )}/show`}
          >
            {data.getIn(['stat', 'resource', 'name'])}
          </Button>
        ),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'resource') {
      return {
        ...sch,
        component: ({
          clusterID,
          namespaceID,
          data,
          svcMeshWorkloadGroupID,
          svcMeshWorkloadID,
        }) => (
          <Button
            link
            component={Link}
            to={`/clusters/${clusterID}/namespaces/${namespaceID}/svcMeshWorkloadGroups/${svcMeshWorkloadGroupID}/svcmeshworkloads/${svcMeshWorkloadID}/svcmeshPods/${data.get(
              'id'
            )}/show`}
          >
            {data.getIn(['resource', 'name'])}
          </Button>
        ),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'meshed') {
      return {
        ...sch,
        component: ({ data, parentType }) => {
          let meshedPodCount = 0;
          let runningPodCount = 0;
          switch (true) {
            case parentType === 'inbound' || parentType === 'outbound':
              meshedPodCount = data.get('meshedPodCount');
              runningPodCount = data.get('runningPodCount') || 0;
              break;
            case parentType === 'pods' || parentType === 'tcp':
              meshedPodCount = data.getIn(['stat', 'meshedPodCount']);
              runningPodCount = data.getIn(['stat', 'runningPodCount']) || 0;
              break;
            default:
              break;
          }
          return (
            <span>
              {meshedPodCount} / {runningPodCount}
            </span>
          );
        },
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'successRate') {
      return {
        ...sch,
        component: ({ data, classes, parentType }) => {
          let successCount = 0;
          let failureCount = 0;
          switch (true) {
            case parentType === 'inbound' || parentType === 'outbound':
              successCount = data.getIn(['basicStat', 'successCount']);
              failureCount = data.getIn(['basicStat', 'failureCount)']) || 0;
              break;
            case parentType === 'pods' || parentType === 'tcp':
              successCount = data.getIn(['stat', 'basicStat', 'successCount']);
              failureCount =
                data.getIn(['stat', 'basicStat', 'failureCount)']) || 0;
              break;
            default:
              break;
          }
          let successRate =
            (successCount / (successCount + failureCount)) * 100;
          let activeClasses = '';
          switch (true) {
            case successRate > 95:
              activeClasses = classes.green;
              break;
            case successRate > 90 && successRate < 95:
              activeClasses = classes.orange;
              break;
            case successRate > 90:
              successRate = classes.red;
              break;
            default:
              break;
          }
          return (
            <Fragment>
              {!isNaN(successRate) ? (
                <Fragment>
                  <span
                    className={classNames(classes.point, activeClasses)}
                  ></span>
                  <span> {successRate} % </span>
                </Fragment>
              ) : (
                '--'
              )}
            </Fragment>
          );
        },
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'RPS') {
      return {
        ...sch,
        component: ({ data, parentType }) => {
          let successCount = 0;
          let failureCount = 0;
          let timeWindow = '0m';
          switch (true) {
            case parentType === 'inbound' || parentType === 'outbound':
              successCount = data.getIn(['basicStat', 'successCount']);
              failureCount = data.getIn(['basicStat', 'failureCount)']) || 0;
              timeWindow =
                Number(data.get('timeWindow').replace('m', '')) * 60 || 0;
              break;
            case parentType === 'pods' || parentType === 'tcp':
              successCount = data.getIn(['stat', 'basicStat', 'successCount']);
              failureCount =
                data.getIn(['stat', 'basicStat', 'failureCount)']) || 0;
              timeWindow =
                Number(data.getIn(['stat', 'timeWindow']).replace('m', '')) *
                  60 || 0;
              break;
            default:
              break;
          }
          const rps = (successCount + failureCount) / timeWindow;

          return (
            <Fragment>
              <span> {!isNaN(rps) ? rps.toFixed(2) : '--'}</span>
            </Fragment>
          );
        },
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'latencyMsP50') {
      return {
        ...sch,
        component: ({ data, parentType }) => {
          let latencyMsP50 = 0;
          switch (true) {
            case parentType === 'inbound' || parentType === 'outbound':
              latencyMsP50 = data.getIn(['basicStat', 'latencyMsP50']);
              break;
            case parentType === 'pods' || parentType === 'tcp':
              latencyMsP50 = data.getIn(['stat', 'basicStat', 'latencyMsP50']);
              break;
            default:
              break;
          }
          return <span>{latencyMsP50 || '--'}</span>;
        },
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'latencyMsP95') {
      return {
        ...sch,
        component: ({ data, parentType }) => {
          let latencyMsP50 = 0;
          switch (true) {
            case parentType === 'inbound' || parentType === 'outbound':
              latencyMsP50 = data.getIn(['basicStat', 'latencyMsP95']);
              break;
            case parentType === 'pods' || parentType === 'tcp':
              latencyMsP50 = data.getIn(['stat', 'basicStat', 'latencyMsP95']);
              break;
            default:
              break;
          }
          return <span>{latencyMsP50 || '--'}</span>;
        },
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'latencyMsP99') {
      return {
        ...sch,
        component: ({ data, parentType }) => {
          let latencyMsP50 = 0;
          switch (true) {
            case parentType === 'inbound' || parentType === 'outbound':
              latencyMsP50 = data.getIn(['basicStat', 'latencyMsP99']);
              break;
            case parentType === 'pods' || parentType === 'tcp':
              latencyMsP50 = data.getIn(['stat', 'basicStat', 'latencyMsP99']);
              break;
            default:
              break;
          }
          return <span>{latencyMsP50 || '--'}</span>;
        },
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'connections') {
      return {
        ...sch,
        component: ({ data }) => (
          <span>{data.getIn(['tcpStat', 'openConnections']) || '--'}</span>
        ),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'readBytes') {
      return {
        ...sch,
        component: ({ data }) => {
          const readBytesTotal = data.getIn(['tcpStat', 'readBytesTotal']) || 0;
          const timeWindow =
            Number(data.getIn(['stat', 'timeWindow']).replace('m', '')) * 60 ||
            0;
          const readBytes = readBytesTotal / timeWindow;
          return (
            <span>{readBytes ? `${readBytes.toFixed(3)} B/s` : '--'}</span>
          );
        },
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'writeBytes') {
      return {
        ...sch,
        component: ({ data }) => {
          const writeBytesTotal =
            data.getIn(['tcpStat', 'writeBytesTotal']) || 0;
          const timeWindow =
            Number(data.getIn(['stat', 'timeWindow']).replace('m', '')) * 60 ||
            0;
          const writeBytes = writeBytesTotal / timeWindow;
          return (
            <span>{writeBytes ? `${writeBytes.toFixed(3)} B/s` : '--'}</span>
          );
        },
      };
    }
    return sch;
  });
export default tableSchema;
