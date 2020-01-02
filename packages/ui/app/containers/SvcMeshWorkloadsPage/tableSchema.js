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
  'name',
  'type',
  'meshed',
  'successRate',
  'RPS',
  'latencyMsP50',
  'latencyMsP95',
  'latencyMsP99',
];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((sch) => {
    if (sch.id === 'name') {
      return {
        ...sch,
        component: ({ pathname, data }) => (
          <Button
            link
            component={Link}
            to={`${pathname}/${data.get('id')}/show`}
          >
            {data.getIn(['resource', 'name'])}
          </Button>
        ),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'type') {
      return {
        ...sch,
        component: ({ data }) => (
          <span>{data.getIn(['resource', 'type'])}</span>
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
  .map((sch) => sch);
export default tableSchema;
