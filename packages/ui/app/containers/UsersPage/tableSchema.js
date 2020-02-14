import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ucfirst } from '@gsmlg/utils';
import Chip from '@material-ui/core/Chip';
import PersonIcon from '@material-ui/icons/Person';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import Button from 'components/CustomButtons/Button';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

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
          <Button action  component={Link} k to={`/users/${data.get('id')}/edit`}>
            <FormattedMessage {...messages.editButton} />
          </Button>
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
