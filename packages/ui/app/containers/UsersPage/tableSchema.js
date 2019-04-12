import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import Chip from '@material-ui/core/Chip';

const schema = ['name', 'projects', 'creationTimestamp'];

const tableSchema = schema.map((id) => ({
  id,
  label: ucfirst(id),
})).map((c) => {
  if (c.id === 'projects') {
    return {
      ...c,
      component(props) {
        const proj = props.data .get('projects') || [];
        return proj.map((p) => (
            <Chip label={`${p.get('cluster')}  ${p.get('namespace')}`} />
          ));
      },
    };
  }
  return c;
});

export default tableSchema;
