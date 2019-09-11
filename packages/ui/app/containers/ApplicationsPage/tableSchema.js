import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';

const inflection = require('inflection');
const schema = ['name', 'type'];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((sch) => {
    if (sch.id === 'name') {
      return {
        ...sch,
        component: (props) => (
          <Button
            link
            to={`/clusters/${props.clusterID}/namespaces/${
              props.namespaceID
            }/${inflection.pluralize(props.data.get('type'))}/${props.data.get(
              'name'
            )}/show`}
            component={Link}
          >
            {props.data.get('name')}
          </Button>
        ),
      };
    }
    return sch;
  });

export default tableSchema;
