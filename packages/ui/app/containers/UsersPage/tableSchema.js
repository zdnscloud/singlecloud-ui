import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ucfirst } from '@gsmlg/utils';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';

const schema = ['name', 'projects', 'creationTimestamp'];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .concat([
    {
      id: 'actions',
      label: 'Actions',
      component: ({ data, removeUser }) => (
        <Fragment>
          <Link to={`/users/${data.get('id')}/edit`}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>
          <ConfirmDelete
            actionName={removeUser}
            id={data.get('id')}
            url={data.getIn(['links', 'remove'])}
          />
        </Fragment>
      ),
    },
  ])
  .map((c) => {
    if (c.id === 'name') {
      return {
        ...c,
        component({ data }) {
          return (
            <Chip
              icon={<PersonIcon />}
              component={Link}
              to={`/users/${data.get('id')}/profile`}
              label={`${data.get('name')}`}
            />
          );
        },
      };
    }
    if (c.id === 'projects') {
      return {
        ...c,
        component({ data }) {
          const proj = data.get('projects') || [];
          return proj.map((p, i) => (
            <Chip
              key={i}
              label={`${p.get('cluster')}  ${p.get('namespace')}`}
            />
          ));
        },
      };
    }
    return c;
  });

export default tableSchema;
