import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import Button from 'components/CustomButtons/Button';
import Chip from '@material-ui/core/Chip';
import IconButton from 'components/CustomIconButtons/IconButton';
import EditIcon from 'components/Icons/Edit';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from './messages';

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
  component: ({ data }) => {
    const val = data.toJS() || {};
    const intl = useIntl();
    const {
      resourceMetrics,
      customMetrics,
      status: { currentMetrics },
    } = val;
    let arr = [];
    const rarr = [];
    const carr = [];
    const currentResourceMetrics = currentMetrics.resourceMetrics || [];
    const currentCustomMetrics = currentMetrics.customMetrics || [];
    const mefactorMetrics = (rm, crm, marr, type) => {
      if (rm && rm.length > 0) {
        rm.forEach((r, i) => {
          const item = {
            name: type === 'resourceMetrics' ? r.resourceName : r.metricName,
          };

          if (r.targetType === 'Utilization' && type === 'resourceMetrics') {
            item.systemVal =
              crm.length > 0 && crm[i].averageUtilization
                ? `${crm[i].averageUtilization}%`
                : '--';
            item.thresholdVal = `${r.averageUtilization}%`;
          } else if (
            r.targetType === 'AverageValue' &&
            type === 'resourceMetrics'
          ) {
            if (r.resourceName === 'cpu') {
              r.averageValue = (r.averageValue / 1000).toFixed(2);
              if (crm[i] && crm[i].averageValue) {
                crm[i].averageValue = (crm[i].averageValue / 1000).toFixed(2);
              }
              item.systemVal =
                crm.length > 0 && crm[i].averageValue
                  ? `${crm[i].averageValue}${intl.formatMessage(
                      messages.formCPUSuffix
                    )}`
                  : '--';
              item.thresholdVal = `${r.averageValue}${intl.formatMessage(
                messages.formCPUSuffix
              )}`;
            } else if (r.resourceName === 'memory') {
              if (crm[i] && crm[i].averageValue) {
                crm[i].averageValue = (crm[i].averageValue / 1024 ** 3).toFixed(
                  2
                );
              }
              r.averageValue = (r.averageValue / 1024 ** 3).toFixed(2);
              item.systemVal =
                crm.length > 0 && crm[i].averageValue
                  ? `${crm[i].averageValue}Gi`
                  : '--';
              item.thresholdVal = `${r.averageValue}Gi`;
            }
          } else {
            item.systemVal =
              crm.length > 0 && crm[i].averageValue
                ? crm[i].averageValue
                : '--';
            item.thresholdVal = r.averageValue;
          }

          marr.push(item);
        });
        return marr;
      }
    };

    mefactorMetrics(
      resourceMetrics,
      currentResourceMetrics,
      rarr,
      'resourceMetrics'
    );
    mefactorMetrics(customMetrics, currentCustomMetrics, carr, 'customMetrics');
    arr = arr.concat(rarr, carr);

    return arr.length > 0
      ? arr.map((val, key) => (
        <Chip
          key={key}
          label={`${val.name} : ${val.systemVal} / ${val.thresholdVal} `}
          />
      ))
      : '--';
  },
});
tableSchema.splice(3, 0, {
  id: 'currentReplicas',
  label: 'CurrentReplicas',
  component: ({ data }) => {
    const item = data.getIn(['status', 'currentReplicas']);
    if (item) {
      return <span>{item}</span>;
    }
    return <span>--</span>;
  },
});
tableSchema.splice(4, 0, {
  id: 'desiredReplicas',
  label: 'DesiredReplicas',
  component: ({ data }) => {
    const item = data.getIn(['status', 'desiredReplicas']);
    if (item) {
      return <span>{item}</span>;
    }
    return <span>--</span>;
  },
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
