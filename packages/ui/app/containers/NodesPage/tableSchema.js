import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import Chip from '@material-ui/core/Chip';
import TimeCell from 'components/Cells/TimeCell';

const schema = [
  'name',
  'address',
  'roles',
  // 'cpu',
  // 'memory',
  // 'operatingSystem',
  // 'operatingSystemImage',
  // 'pod',
  // 'dockerVersion',
  'labels',
  'creationTimestamp',
];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((item) => {
    if (item.id === 'roles') {
      return {
        ...item,
        component({ value }) {
          return value
            .map((val, key) => <Chip key={key} label={`${val}`} />)
            .toList();
        },
      };
    }
    if (item.id === 'labels') {
      return {
        ...item,
        component({ value }) {
          return value
            .map((val, key) => <Chip key={key} label={`${key}=${val}`} />)
            .toList();
        },
      };
    }
    if (item.id === 'creationTimestamp') {
      return {
        ...item,
        component: TimeCell,
      };
    }
    return item;
  });

export default tableSchema;
