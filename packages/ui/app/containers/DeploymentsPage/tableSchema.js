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
import LogcollectionDialog from 'containers/LogcollectionPage/LogcollectionDialog';
import MetricsDialog from 'containers/MetricsPage/MetricsDialog';

const schema = ['name', 'replicas', 'creationTimestamp'];

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
      component: ({
        clusterID,
        namespaceID,
        data,
        setRollback,
        removeDeployment,
      }) => (
        <Fragment>
          <LogcollectionDialog
            url={data.getIn(['links', 'fluentbitconfigs'])}
            id={`${namespaceID}_deployment_${data.get('id')}`}
          />

          <MetricsDialog
            url={data.getIn(['links', 'metrics'])}
            id={data.get('id')}
            type="deployment"
          />

          <IconButton
            aria-label="Update"
            component={Link}
            to={`/clusters/${clusterID}/namespaces/${namespaceID}/deployments/${data.get(
              'id'
            )}/update`}
          >
            <UpgradeIcon />
          </IconButton>
          <IconButton onClick={() => setRollback(data.get('id'))}>
            <RollbackIcon />
          </IconButton>

          <ConfirmDelete
            actionName={removeDeployment}
            id={data.get('id')}
            url={data.getIn(['links', 'remove'])}
            clusterID={clusterID}
            namespaceID={namespaceID}
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

    if (sch.id === 'replicas') {
      return {
        ...sch,
        component: ({ data }) => (
          <>
            {data.getIn(['status', 'readyReplicas']) || 0}/
            {data.getIn(['replicas'])}
            <LinearProgress
              variant="determinate"
              value={
                ((data.getIn(['status', 'readyReplicas']) || 0) /
                  data.getIn(['replicas'])) *
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
