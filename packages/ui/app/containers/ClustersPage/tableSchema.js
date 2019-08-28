import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TimeCell from 'components/Cells/TimeCell';
import ShellIcon from 'components/Icons/Shell';
import SuccessIcon from 'components/Icons/Success';
import FailureIcon from 'components/Icons/Failure';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import manageIcon from 'images/clusters/manage.png';

const schema = ['status', 'name', 'nodeCount', 'creationTimestamp'];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((item) => {
    if (item.id === 'creationTimestamp') {
      return {
        ...item,
        component: TimeCell,
      };
    }
    return item;
  })
  .concat([
    {
      id: 'actions',
      label: 'Actions',
      component: (props) => (
        <Fragment>
          <IconButton
            variant="outlined"
            size="small"
            className={props.classes.button}
            to={`/clusters/${props.data.get('id')}/manage`}
            component={Link}
          >
            <img src={manageIcon} alt="manageIcon" />
          </IconButton>
          <ConfirmDelete
            actionName={props.removeCluster}
            id={props.data.get('id')}
            url={props.data.getIn(['links', 'remove'])}
          />
        </Fragment>
      ),
    },
  ])
  .map((sch) => {
    if (sch.id === 'status') {
      return {
        ...sch,
        component: (props) => props.data.get('status'),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'name') {
      return {
        ...sch,
        component: ({ data }) => (
          data.get('status') === 'Running' ? (
            <Button
              link
              to={`/clusters/${data.get('id')}/show`}
              component={Link}
            >
              {data.get('name')}
            </Button>
          ) : data.get('name')
        ),
      };
    }
    return sch;
  });

export default tableSchema;
