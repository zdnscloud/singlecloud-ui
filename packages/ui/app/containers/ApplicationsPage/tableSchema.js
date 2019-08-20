import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
            case 'service':
              return <Button
              color="primary"
              to={`/clusters/${props.clusterID}/namespaces/${props.namespaceID}/${props.data.get('type')}Link`}
              component={Link}
            >
              {props.data.get('name')}
            </Button>;
              break;
            default:
              return  <Button
              color="primary"
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
