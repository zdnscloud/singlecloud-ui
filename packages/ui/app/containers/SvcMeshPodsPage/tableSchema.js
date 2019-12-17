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
            {data.get('id')}
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
        component: ({ data }) => (
          <span>
            {data.get('meshedPodCount') || '--'} / {data.get('runningPodCount') || '--'}
          </span>
        ),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'successRate') {
      return {
        ...sch,
        component: ({ data, classes }) => {
          const successCount = data.getIn(['basicStat', 'successCount']);
          const failureCount = data.getIn(['basicStat', 'failureCount)']) || 0;
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
        component: ({ data }) => {
          const successCount = data.getIn(['basicStat', 'successCount']);
          const failureCount = data.getIn(['basicStat', 'failureCount)']) || 0;
          const timeWindow = data.get('timeWindow')
            ? Number(data.get('timeWindow').replace('m', '')) * 60
            : 0;
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
        component: ({ data }) => (
          <span>{data.getIn(['basicStat', 'latencyMsP50']) || '--'}</span>
        ),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'latencyMsP95') {
      return {
        ...sch,
        component: ({ data }) => (
          <span>{data.getIn(['basicStat', 'latencyMsP95']) || '--'}</span>
        ),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'latencyMsP99') {
      return {
        ...sch,
        component: ({ data }) => (
          <span>{data.getIn(['basicStat', 'latencyMsP99']) || '--'}</span>
        ),
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
          const timeWindow = data.get('timeWindow')
            ? Number(data.get('timeWindow').replace('m', '')) * 60
            : 0;
          const readBytes = readBytesTotal / (timeWindow * 1000);
          return (
            <span>{readBytes ? `${readBytes.toFixed(3)} kB/s` : '--'}</span>
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
          const timeWindow = data.get('timeWindow')
            ? Number(data.get('timeWindow').replace('m', '')) * 60
            : 0;
          const writeBytes = writeBytesTotal / (timeWindow * 1000);
          return (
            <span>{writeBytes ? `${writeBytes.toFixed(3)} kB/s` : '--'}</span>
          );
        },
      };
    }
    return sch;
  });
export default tableSchema;
