import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import Button from 'components/CustomButtons/Button';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { renderTableMetrics } from './utils/utils';

const inflection = require('inflection');

const schema = [
  'name',
  'app',
  'metrics',
  'currentReplicas',
  'desiredReplicas',
  'replicasScope',
  'creationTimestamp',
];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((sch) => {
    if (sch.id === 'name') {
      return {
        ...sch,
        component: ({ data, pathname,classes }) =>
          data.get('deletionTimestamp') ? (
            <span className={ data.get('deletionTimestamp') ? classes.strikeout : null}>{ data.get('name')}</span>
          ) : (
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
  })
  .map((item) => {
    if (item.id === 'creationTimestamp') {
      return {
        ...item,
        component: TimeCell,
      };
    }
    return item;
  })
  .map((item) => {
    if (item.id === 'app') {
      return {
        ...item,
        component: ({ data, clusterID, namespaceID }) => (
          <Button
            link
            to={`/clusters/${clusterID}/namespaces/${namespaceID}/${inflection.pluralize(
              data.get('scaleTargetKind')
            )}/${data.get('scaleTargetName')}/show`}
            component={Link}
          >
            {data.get('scaleTargetKind')}_{data.get('scaleTargetName')}
          </Button>
        ),
      };
    }
    return item;
  })
  .map((item) => {
    if (item.id === 'metrics') {
      return {
        ...item,
        component: ({ data, intl }) => renderTableMetrics(data, intl),
      };
    }
    return item;
  })
  .map((item) => {
    if (item.id === 'currentReplicas') {
      return {
        ...item,
        component: ({ data }) => (
          <span>{data.getIn(['status', 'currentReplicas']) || '--'}</span>
        ),
      };
    }
    return item;
  })
  .map((item) => {
    if (item.id === 'desiredReplicas') {
      return {
        ...item,
        component: ({ data }) => (
          <span>{data.getIn(['status', 'desiredReplicas']) || '--'}</span>
        ),
      };
    }
    return item;
  })
  .map((item) => {
    if (item.id === 'replicasScope') {
      return {
        ...item,
        component: ({ data }) => (
          <span>
            {data.get('minReplicas')} ~ {data.get('maxReplicas')}
          </span>
        ),
      };
    }
    return item;
  })
  .concat([
    {
      id: 'actions',
      label: 'Actions',
      component: ({
        removeHorizontalPodAutoscaler,
        data,
        clusterID,
        namespaceID,
      }) => (
        <Fragment>
          <Button
            action
            component={Link}
            to={`/clusters/${clusterID}/namespaces/${namespaceID}/horizontalPodAutoscalers/${data.get(
              'id'
            )}/update`}
            disabled={data.get('deletionTimestamp')}
          >
            <FormattedMessage {...messages.editButton} />
          </Button>
          <ConfirmDelete
            actionName={removeHorizontalPodAutoscaler}
            id={data.get('id')}
            url={data.getIn(['links', 'remove'])}
            clusterID={clusterID}
            namespaceID={namespaceID}
            disabled={data.get('deletionTimestamp')}
          />
        </Fragment>
      ),
    },
  ]);

export default tableSchema;
