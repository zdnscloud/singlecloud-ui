import React from 'react';
import moment from 'moment';

const TimeCell = ({ value }) => {
  if (value == null) return 'N/A';
  const time = moment(value);
  const format = 'YYYY-MM-DD HH:mm:ss';

  return <time dateTime={value}>{time.format(format)}</time>;
};

export default TimeCell;
