import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import {
  getMeshed,
  getSuccessRate,
  getRPS,
  getLatency,
  getBytes,
} from '../../utils/svcMesh';

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
          podId,
        }) => (
          <Button
            link
            component={Link}
            to={`/clusters/${clusterID}/namespaces/${namespaceID}/svcMeshWorkloadGroups/${svcMeshWorkloadGroupID}/svcmeshworkloads/${svcMeshWorkloadID}/svcmeshpods/${podId}/show`}
          >
            {podId}
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
            to={`/clusters/${clusterID}/namespaces/${namespaceID}/svcMeshWorkloadGroups/${svcMeshWorkloadGroupID}/svcmeshworkloads/${svcMeshWorkloadID}/svcmeshPods/${data.getIn(
              ['resource', 'name']
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
        component: ({ data }) => getMeshed(data),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'successRate') {
      return {
        ...sch,
        component: ({ data, classes }) => getSuccessRate(data, classes),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'RPS') {
      return {
        ...sch,
        component: ({ data }) => getRPS(data),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'latencyMsP50') {
      return {
        ...sch,
        component: ({ data }) => getLatency(data, 'latencyMsP50'),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'latencyMsP95') {
      return {
        ...sch,
        component: ({ data }) => getLatency(data, 'latencyMsP95'),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'latencyMsP99') {
      return {
        ...sch,
        component: ({ data }) => getLatency(data, 'latencyMsP99'),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'connections') {
      return {
        ...sch,
        component: ({ data }) => (
          <span>
            {(data && data.getIn(['tcpStat', 'openConnections'])) || '--'}
          </span>
        ),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'readBytes') {
      return {
        ...sch,
        component: ({ data }) => getBytes(data, 'readBytes'),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'writeBytes') {
      return {
        ...sch,
        component: ({ data }) => getBytes(data, 'writeBytes'),
      };
    }
    return sch;
  });
export default tableSchema;
