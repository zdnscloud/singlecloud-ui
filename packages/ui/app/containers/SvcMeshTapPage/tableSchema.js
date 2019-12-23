import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';

const schema = [
  'self',
  'proxyDirection',
  'name',
  'method',
  'path',
  'latency',
  'httpStatus',
  'grpcStatus',
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
        component: ({ data }) =>
          data.get('proxyDirection') === 'INBOUND'
            ? data.getIn(['sourceMeta', 'labels', 'deployment'])
            : data.getIn(['destinationMeta', 'labels', 'deployment']),
      };
    }
    if (sch.id === 'method') {
      return {
        ...sch,
        component: ({ data }) => data.getIn(['event', 'requestInit', 'method']),
      };
    }
    if (sch.id === 'path') {
      return {
        ...sch,
        component: ({ data }) => data.getIn(['event', 'requestInit', 'path']),
      };
    }
    return sch;
  });

export default tableSchema;
