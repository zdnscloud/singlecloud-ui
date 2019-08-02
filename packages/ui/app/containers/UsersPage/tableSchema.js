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
      component: (props) => (
        <Fragment>
          <Link
            to={`/users/${props.data.get('id')}/edit`}
            className={props.classes.createBtnLink}
          >
            <IconButton aria-label="Edit User">
              <EditIcon />
            </IconButton>
          </Link>
          <ConfirmDelete
            actionName={props.removeUser}
            id={props.data.get('id')}
            url={props.data.getIn(['links', 'remove'])}
          />
        </Fragment>
      ),
    },
  ])
  .map((c) => {
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
          const proj = props.data.get('projects') || [];
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
