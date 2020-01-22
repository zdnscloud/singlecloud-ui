import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import IconButton from 'components/CustomIconButtons/IconButton';
import DebugIcon from 'components/Icons/Debug';
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
  .concat([
    {
      id: 'actions',
      label: 'Actions',
      component: ({ clusterID, namespaceID, data, parentType, stat }) => {
        const type = data.getIn(['resource', 'type']);
        const name = data.getIn(['resource', 'name']);
        const toType = stat.getIn(['resource', 'type']);
        const toName = stat.getIn(['resource', 'name']);
        const inboundUrl = `/clusters/${clusterID}/namespaces/${namespaceID}/svcMeshTap?resource_type=${type}&resource_name=${name}&to_resource_type=${toType}&to_resource_name=${toName}`;
        const outboundUrl = `/clusters/${clusterID}/namespaces/${namespaceID}/svcMeshTap?resource_type=${toType}&resource_name=${toName}&to_resource_type=${type}&to_resource_name=${name}`;
        return (
          <Fragment>
            <IconButton
              component={Link}
              to={parentType === 'inbound' ? inboundUrl : outboundUrl}
            >
              <DebugIcon />
            </IconButton>
          </Fragment>
        );
      },
    },
  ])
  .map((sch) => {
    if (sch.id === 'pods') {
      return {
        ...sch,
        component: ({ clusterID, namespaceID, data, svcMeshWorkloadID }) => {
          const name = data.getIn(['resource', 'name']);
          return name ? (
            <Button
              link
              component={Link}
              to={`/clusters/${clusterID}/namespaces/${namespaceID}/svcmeshworkloads/${svcMeshWorkloadID}/svcmeshpods/${data.get(
                'id'
              )}/show`}
            >
              {name}
            </Button>
          ) : (
            <span>--</span>
          );
        },
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'resource') {
      return {
        ...sch,
        component: ({ clusterID, namespaceID, data }) => (
          <Button
            link
            component={Link}
            to={`/clusters/${clusterID}/namespaces/${namespaceID}/svcmeshworkloads/${data.get(
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
