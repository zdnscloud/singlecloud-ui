import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ucfirst } from '@gsmlg/utils';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import PersonIcon from '@material-ui/icons/Person';

const schema = ['name', 'projects', 'creationTimestamp'];

const tableSchema = schema.map((id) => ({
  id,
  label: ucfirst(id),
})).map((c) => {
  if (c.id === 'name') {
    return {
      ...c,
      component(props) {
        const d = props.data;
        return (
          <Chip
            icon={<PersonIcon />}
            component={Link}
            to={`/users/${d.get('id')}/profile`}
            label={`${d.get('name')}`}
          />
        );
      },
    };
  }
  if (c.id === 'projects') {
    return {
      ...c,
      component(props) {
        const proj = props.data .get('projects') || [];
        return proj.map((p, i) => (
          <Chip key={i} label={`${p.get('cluster')}  ${p.get('namespace')}`} />
        ));
      },
    };
  }
  return c;
});

export default tableSchema;
