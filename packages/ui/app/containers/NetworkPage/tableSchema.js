import React from 'react';
import { ucfirst } from '@gsmlg/utils';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const schema = ['ip', 'name'];

const tableSchema = schema.map((id) => {
  return ({
    id,
    label: ucfirst(id),
  });
});

export default tableSchema;
