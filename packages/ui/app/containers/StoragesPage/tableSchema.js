import React from 'react';
import { ucfirst } from '@gsmlg/utils';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const schema = ['name', 'nodes', 'size', 'usedsize', 'freesize'];

const tableSchema = schema.map((id) => {
  if (id === 'pods') {
    return {
      id,
      label: ucfirst(id),
      component: (props) => (
        <List dense>
          {props.data.get('pods') &&
            props.data.get('pods').map((p, i) => (
              <ListItem key={`n-i-${p.get('name')}`}>
                <ListItemText primary={p.get('name')} />
              </ListItem>
            ))}
        </List>
      ),
    };
  }
  return {
    id,
    label: ucfirst(id),
  };
});

export default tableSchema;
