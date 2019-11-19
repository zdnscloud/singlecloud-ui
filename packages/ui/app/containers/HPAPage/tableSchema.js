import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import Button from 'components/CustomButtons/Button';
import Chip from '@material-ui/core/Chip';
import IconButton from 'components/CustomIconButtons/IconButton';
import EditIcon from 'components/Icons/Edit';

const inflection = require('inflection');

const schema = ['name', 'creationTimestamp'];

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
        removeHorizontalpodautoscaler,
        data,
        clusterID,
        namespaceID,
      }) => (
        <Fragment>
          <IconButton
            aria-label="Edit"
            component={Link}
            to={`/clusters/${clusterID}/namespaces/${namespaceID}/hpa/${data.get(
              'id'
            )}/update`}
          >
            <EditIcon />
          </IconButton>
          <ConfirmDelete
            actionName={removeHorizontalpodautoscaler}
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
        component: ({ data, pathname }) => (
          <Button
            link
            component={Link}
            to={`${pathname}/${data.get('id')}/show`}
          >
            {data.get('name')}
          </Button>
        ),
      };
    }
    return sch;
  });
tableSchema.splice(1, 0, {
  id: 'app',
  label: 'App',
  component: ({ data, clusterID, namespaceID }) => (
    <Button
      link
      to={`/clusters/${clusterID}/namespaces/${namespaceID}/${inflection.pluralize(
        data.get('scaleTargetKind')
      )}/${data.get('scaleTargetName')}/show`}
      component={Link}
    >
      {data.get('scaleTargetKind')} _ {data.get('scaleTargetName')}
    </Button>
  ),
});
tableSchema.splice(2, 0, {
  id: 'metrics',
  label: 'Metrics',
  // component: ({ data }) =>
  //   data
  //     .getIn(['status', 'currentMetrics', 'resourceMetrics'])
  //     .map((val, key) => <Chip key={key} label={`${val}`} />),
  component: ({ data }) => <span></span>,
});
tableSchema.splice(3, 0, {
  id: 'currentReplicas',
  label: 'CurrentReplicas',
  component: ({ data }) => (
    <span>{data.getIn(['status', 'currentReplicas'])}</span>
  ),
});
tableSchema.splice(4, 0, {
  id: 'desiredReplicas',
  label: 'DesiredReplicas',
  component: ({ data }) => (
    <span>{data.getIn(['status', 'desiredReplicas'])}</span>
  ),
});
tableSchema.splice(5, 0, {
  id: 'replicasScope',
  label: 'ReplicasScope',
  component: ({ data }) => (
    <span>
      {data.get('minReplicas')} ~ {data.get('maxReplicas')}
    </span>
  ),
});

export default tableSchema;
