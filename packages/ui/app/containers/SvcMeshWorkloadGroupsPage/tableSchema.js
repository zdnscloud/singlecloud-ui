import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import classNames from 'classnames';
import timeWindowSeconds from './utils/timeWindowSeconds';
const schema = [
  'name',
  'type',
  'meshed',
  'successRate',
  'RPS',
  'latencyMsP50',
  'latencyMsP95',
  'latencyMsP99',
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
        component: ({ pathname, data, workloadID }) => (
          <Button
            link
            component={Link}
            to={`${pathname}/${workloadID}/svcmeshworkloads/${data.get(
              'id'
            )}/show`}
          >
            {data.getIn(['stat', 'resource', 'name'])}
          </Button>
        ),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'type') {
      return {
        ...sch,
        component: ({ data }) => (
          <span>{data.getIn(['stat', 'resource', 'type'])}</span>
        ),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'meshed') {
      return {
        ...sch,
        component: ({ data }) => (
          <span>
            {data.getIn(['stat', 'meshedPodCount']) || '--'} /
            {data.getIn(['stat', 'runningPodCount']) || '--'}
          </span>
        ),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'successRate') {
      return {
        ...sch,
        component: ({ data, classes }) => {
          const successCount = data.getIn([
            'stat',
            'basicStat',
            'successCount',
          ]);
          const failureCount =
            data.getIn(['stat', 'basicStat', 'failureCount)']) || 0;
          let successRate =
            (successCount / (successCount + failureCount)) * 100;
          let activeClasses = '';
          switch (true) {
            case successRate > 95:
              activeClasses = classes.green;
              break;
            case successRate > 90 && successRate < 95:
              activeClasses = classes.orange;
              break;
            case successRate > 90:
              successRate = classes.red;
              break;
            default:
              break;
          }
          return (
            <Fragment>
              {!isNaN(successRate) ? (
                <Fragment>
                  <span
                    className={classNames(classes.point, activeClasses)}
                  ></span>
                  <span> {successRate} % </span>
                </Fragment>
              ) : (
                '--'
              )}
            </Fragment>
          );
        },
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'RPS') {
      return {
        ...sch,
        component: ({ data }) => {
          const successCount = data.getIn([
            'stat',
            'basicStat',
            'successCount',
          ]);
          const failureCount =
            data.getIn(['stat', 'basicStat', 'failureCount)']) || 0;
          const timeWindow = timeWindowSeconds(
            data.getIn(['stat', 'timeWindow'])
          );
          const rps = (successCount + failureCount) / timeWindow;

          return (
            <Fragment>
              <span> {!isNaN(rps) ? rps.toFixed(2) : '--'}</span>
            </Fragment>
          );
        },
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'latencyMsP50') {
      return {
        ...sch,
        component: ({ data }) => (
          <span>
            {data.getIn(['stat', 'basicStat', 'latencyMsP50']) || '--'}
          </span>
        ),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'latencyMsP95') {
      return {
        ...sch,
        component: ({ data }) => (
          <span>
            {data.getIn(['stat', 'basicStat', 'latencyMsP95']) || '--'}
          </span>
        ),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'latencyMsP99') {
      return {
        ...sch,
        component: ({ data }) => (
          <span>
            {data.getIn(['stat', 'basicStat', 'latencyMsP99']) || '--'}
          </span>
        ),
      };
    }
    return sch;
  })
  .map((sch) => sch);
export default tableSchema;
