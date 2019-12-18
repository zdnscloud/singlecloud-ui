import React, { Fragment } from 'react';
import classNames from 'classnames';
import { fromJS } from 'immutable';

export const refactorMetric = (data) => {
  const metric = data.map((item) => {
    const { creationTimestamp, id, stat } = item.toJS();
    return fromJS({ creationTimestamp, id, ...stat });
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

export const getMeshed = (data) => (
  <span>
    {data.get('meshedPodCount') || '--'} /{data.get('runningPodCount') || '--'}
  </span>
);

export const getSuccessRate = (data, classes) => {
  const successCount = data.getIn(['basicStat', 'successCount']);
  const failureCount = data.getIn(['basicStat', 'failureCount)']) || 0;
  let successRate = (successCount / (successCount + failureCount)) * 100;
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
          <span className={classNames(classes.point, activeClasses)}></span>
          <span> {successRate} % </span>
        </Fragment>
      ) : (
        '--'
      )}
    </Fragment>
  );
};

export const getRPS = (data) => {
  const successCount = data.getIn(['basicStat', 'successCount']);
  const failureCount = data.getIn(['basicStat', 'failureCount)']) || 0;
  const timeWindow = timeWindowSeconds(data.get('timeWindow'));
  const rps = (successCount + failureCount) / timeWindow;

  return (
    <Fragment>
      <span> {!isNaN(rps) ? rps.toFixed(2) : '--'}</span>
    </Fragment>
  );
};

export const getLatency = (data, type) => (
  <span>{data.getIn(['basicStat', type]) || '--'}</span>
);

export const getBytes = (data, type) => {
  const typeBytesTotal = data.getIn(['tcpStat', `${type}Total`]) || 0;
  const timeWindow = timeWindowSeconds(data.get('timeWindow'));
  const typeBytes = typeBytesTotal / (timeWindow * 1000);
  return <span>{typeBytes ? `${typeBytes.toFixed(3)} kB/s` : '--'}</span>;
};
