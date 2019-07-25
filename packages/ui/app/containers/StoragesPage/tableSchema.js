import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import EditIcon from 'components/Icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';

const schema = ['name', 'storagetype', 'nodes', 'size', 'usedsize', 'freesize'];

const tableSchema = schema
  .map((id) => {
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
  })
  .concat([
    {
      id: 'actions',
      label: 'Actions',
      component: (props) => (
        <Fragment>
          <IconButton
            aria-label="Edit"
            component={Link}
            to={`${props.pathname}/${props.data.get('id')}/edit`}
          >
            <EditIcon />
          </IconButton>

          <ConfirmDelete 
              actionName={props.removeStorage}
              id={props.data.get('id')}
              url={props.data.getIn(['links', 'remove'])}
              clusterID={props.clusterID}
            />
        </Fragment>
      ),
    },
  ])
  .map((sch) => {
    if (sch.id === 'name') {
      return {
        ...sch,
        component: (props) => (
          <Button
            color="primary"
            component={Link}
            to={`${props.pathname}/${props.data.get('id')}/show`}
          >
            {props.data.get('name')}
          </Button>
        ),
      };
    }
    return sch;
  })
;

export default tableSchema;
