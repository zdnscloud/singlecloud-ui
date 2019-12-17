import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
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
        component: ({ pathname, data }) => (
          <Button link component={Link} to={`${pathname}/${data.get('id')}`}>
            {data.get('pods')}
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
        component: ({ pathname, data }) => (
          <Button link component={Link} to={`${pathname}/${data.get('id')}`}>
            {data.get('resource')}
          </Button>
        ),
      };
    }
    return sch;
  });
export default tableSchema;
