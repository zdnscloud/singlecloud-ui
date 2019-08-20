import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import TimeCell from 'components/Cells/TimeCell';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';

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
    if (item.id === 'name') {
      return {
        ...item,
        component: (props) => (
          <Button
            color="primary"
            to={`/clusters/${props.clusterID}/nodes/${props.data.get(
              'id'
            )}/show`}
            component={Link}
          >
            {props.data.get('name')}
          </Button>
        ),
      };
    }
    if (item.id === 'roles') {
      return {
        ...item,
        component({ value }) {
          return value != null
            ? value
                .map((val, key) => <Chip key={key} label={`${val}`} />)
                .toList()
            : null;
        },
      };
    }
    if (item.id === 'labels') {
      return {
        ...item,
        component({ value }) {
          return value != null
            ? value
                .map((val, key) => <Chip key={key} label={`${key}=${val}`} />)
                .toList()
            : null;
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
