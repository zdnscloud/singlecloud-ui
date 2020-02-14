import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from 'components/CustomButtons/Button';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import LogcollectionDialog from 'containers/LogcollectionPage/LogcollectionDialog';
import MetricsDialog from 'containers/MetricsPage/MetricsDialog';
import UpdatingProgress from 'components/Progress/UpdatingProgress';
import { FormattedMessage } from 'react-intl';
import TableActions from 'components/TableActions/TableActions';
import messages from './messages';

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
        removeDaemonSet,
      }) => (
        <Fragment>
          <LogcollectionDialog
            url={data.getIn(['links', 'fluentbitconfigs'])}
            id={`${namespaceID}_daemonset_${data.get('id')}`}
          />

          <MetricsDialog
            url={data.getIn(['links', 'metrics'])}
            id={data.get('id')}
            type="daemonset"
          />

          <TableActions 
            actions={
              [
                <Button
                  action
                  component={Link}
                  to={`/clusters/${clusterID}/namespaces/${namespaceID}/daemonSets/${data.get(
                    'id'
                  )}/update`}
                >
                  <FormattedMessage {...messages.upgradeButton} />
                </Button>,
                <Button onClick={() => setRollback(data.get('id'))} action>
                  <FormattedMessage {...messages.rollbackButton} />
                </Button>,
    
                <ConfirmDelete
                  actionName={removeDaemonSet}
                  id={data.get('id')}
                  url={data.getIn(['links', 'remove'])}
                  clusterID={clusterID}
                  namespaceID={namespaceID}
                />,
              ]}
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
            {(data.getIn(['status', 'updating'])
              ? data.getIn(['status', 'updatedReplicas'])
              : data.getIn(['status', 'readyReplicas'])) || 0}
            /{data.getIn(['replicas'])}
            <UpdatingProgress
              isUpdating={data.getIn(['status', 'updating'])}
              current={
                (data.getIn(['status', 'updating'])
                  ? data.getIn(['status', 'updatedReplicas'])
                  : data.getIn(['status', 'readyReplicas'])) || 0
              }
              buffer={data.getIn(['status', 'updatingReplicas']) || 0}
              total={data.get('replicas')}
            />
          </>
        ),
      };
    }

    return sch;
  });
export default tableSchema;
