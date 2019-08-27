import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';

const schema = [
  'name',
  'type',
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
        component: (props) => {
          switch (props.data.get('type')) {
            default:
              return  <Button
              link
              to={`/clusters/${props.clusterID}/namespaces/${props.namespaceID}/${props.data.get('type')}s/${props.data.get('name')}/show`}
              component={Link}
            >
              {props.data.get('name')}
            </Button>
              break;
           }
        },
      };
    }
    return sch;
  });

export default tableSchema;
