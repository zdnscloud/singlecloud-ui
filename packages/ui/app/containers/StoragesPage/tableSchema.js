import React from 'react';
import { ucfirst } from '@gsmlg/utils';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const schema = ['name', 'storagetype', 'nodes', 'size', 'usedsize', 'freesize'];

const tableSchema = schema.map((id) => {
  if (id === 'nodes') {
    return {
      id,
      label: ucfirst(id),
      component: (props) => (
        <span>
          {props.data.get('nodes') && props.data.get('nodes').size}
        </span>

      ),
    };
  }
  return {
    id,
    label: ucfirst(id),
  };
});

export default tableSchema;
