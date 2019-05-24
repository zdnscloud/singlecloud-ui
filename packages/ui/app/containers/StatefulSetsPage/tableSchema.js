import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import Chip from '@material-ui/core/Chip';

const schema = ['name', 'replicas', 'creationTimestamp'];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }));

export default tableSchema;
