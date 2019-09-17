import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from 'components/CustomButtons/Button';
import IconButton from 'components/CustomIconButtons/IconButton';
import UpgradeIcon from 'components/Icons/Upgrade';
import RollbackIcon from 'components/Icons/Rollback';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';

const schema = ['name', 'creationTimestamp', 'status'];

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
          <IconButton onClick={() => props.setUpgrade(props.data.get('id'))}>
            <UpgradeIcon />
          </IconButton>

          <IconButton onClick={() => props.setRollback(props.data.get('id'))}>
            <RollbackIcon />
          </IconButton>

          <ConfirmDelete
            actionName={props.removeDaemonSet}
            id={props.data.get('id')}
            url={props.data.getIn(['links', 'remove'])}
            clusterID={props.clusterID}
            namespaceID={props.namespaceID}
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
            link
            component={Link}
            to={`${props.pathname}/${props.data.get('id')}/show`}
          >
            {props.data.get('name')}
          </Button>
        ),
      };
    }

    if (sch.id === 'status') {
      return {
        ...sch,
        component: ({ data }) => (
          <>
            {data.getIn(['status', 'numberReady']) || 0}/
            {data.getIn(['status', 'desiredNumberScheduled'])}
            <LinearProgress
              variant="determinate"
              value={
                (data.getIn(['status', 'numberReady']) /
                  data.getIn(['status', 'desiredNumberScheduled'])) *
                100
              }
            />
          </>
        ),
      };
    }

    return sch;
  });
export default tableSchema;
