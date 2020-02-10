import React, { Fragment } from 'react';
import classNames from 'classnames';
import { fromJS } from 'immutable';
import _ from 'lodash';

export const refactorMetric = (data) => {
  if (_.isEmpty(data)) {
    return [];
  }
  const metric = data.map((item) => {
    const { stat, ...itemDatas } = item.toJS();
    return fromJS({ ...itemDatas, ...stat });
  });
  return metric;
};

export const timeWindowSeconds = (timeWindow) => {
  let seconds = 0;

  if (timeWindow === '10s') {
    seconds = 10;
  }
  if (timeWindow === '1m') {
    seconds = 60;
  }
  if (timeWindow === '10m') {
    seconds = 600;
  }
  if (timeWindow === '1h') {
    seconds = 3600;
  }

  return seconds;
};

export const getMeshed = (data) => {
  if (_.isEmpty(data)) {
    return <span>--</span>;
  }
  return (
    <span>
      {data.get('meshedPodCount') || '--'} /
      {data.get('runningPodCount') || '--'}
    </span>
  );
};

export const getSRClassName = (sr, classes) => {
  let activeClasses = '';
  switch (true) {
    case sr > 95:
      activeClasses = classes.green;
      break;
    case sr > 90 && sr < 95:
      activeClasses = classes.orange;
      break;
    case sr < 90:
      activeClasses = classes.red;
      break;
    default:
      break;
  }
  return activeClasses;
};

export const getSR = (data) => {
  if (_.isEmpty(data)) {
    return <span>--</span>;
  }
  const successCount = data.getIn(['basicStat', 'successCount']) || 0;
  const failureCount = data.getIn(['basicStat', 'failureCount']) || 0;
  const successRate = (successCount / (successCount + failureCount)) * 100;
  return successRate.toFixed(2);
};

export const getSuccessRate = (data, classes) => {
  if (_.isEmpty(data)) {
    return <span>--</span>;
  }
  const successRate = getSR(data);
  return (
    <Fragment>
      {!Number.isNaN(successRate) ? (
        <Fragment>
          <span
            className={classNames(
              classes.point,
              getSRClassName(successRate, classes)
            )}
          ></span>
          <span> {successRate} % </span>
        </Fragment>
      ) : (
        '--'
      )}
    </Fragment>
  );
};

export const getRPS = (data) => {
  if (_.isEmpty(data)) {
    return <span>--</span>;
  }
  const successCount = data.getIn(['basicStat', 'successCount']) || 0;
  const failureCount = data.getIn(['basicStat', 'failureCount']) || 0;
  const timeWindow = timeWindowSeconds(data.get('timeWindow'));
  const rps = (successCount + failureCount) / timeWindow;

  return (
    <Fragment>
      <span> {!Number.isNaN(rps) ? rps.toFixed(2) : '--'}</span>
    </Fragment>
  );
};

export const getLatency = (data, type) => {
  if (_.isEmpty(data)) {
    return <span>--</span>;
  }
  const LatencyType = data.getIn(['basicStat', type]);
  return <span>{LatencyType ? `${LatencyType} ms` : '--'}</span>;
};

export const getBytes = (data, type) => {
  if (_.isEmpty(data)) {
    return <span>--</span>;
  }
  const typeBytesTotal = data.getIn(['tcpStat', `${type}Total`]) || 0;
  const timeWindow = timeWindowSeconds(data.get('timeWindow'));
  const typeBytes = typeBytesTotal / (timeWindow * 1000);
  return <span>{typeBytes ? `${typeBytes.toFixed(3)} kB/s` : '--'}</span>;
};
