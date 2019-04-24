import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import Chip from '@material-ui/core/Chip';

const schema = ['name', 'replicas', 'containers'];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((item) => {
    if (item.id === 'containers') {
      return {
        ...item,
        component(props) {
          return props.data
            .get('containers')
            .map((ctn, i) => (
              <Chip key={i} label={`${ctn.get('name')}  ${ctn.get('image')}`} />
            ));
        },
      };
    }
    return item;
  });

export default tableSchema;