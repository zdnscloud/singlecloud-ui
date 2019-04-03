import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import Chip from '@material-ui/core/Chip';

const schema = [
  'name',
  'address',
  'role',
  'cpu',
  'memory',
  'operatingSystem',
  'operatingSystemImage',
  'pod',
  'dockerVersion',
  'creationTimestamp',
  'labels',
];

const tableSchema = schema.map((id) => ({
  id,
  label: ucfirst(id),
}))
  .map((item) => {
    if (item.id === 'labels') {
      return {
        ...item,
        component(props) {
          return props.data
            .get('labels')
            .map((val, key) => <Chip label={`${key}=${val}`} />).toList();
        },
      };
    }
    return item;
  });

export default tableSchema;
