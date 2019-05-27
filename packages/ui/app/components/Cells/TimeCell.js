import React from 'react';
import moment from 'moment';

const TimeCell = ({ value }) => {
  const time = moment(value);
  const format = 'YYYY-MM-DD HH:mm:ss';

  return (
    <time datetime={value}>
      {time.format(format)}
    </time>
  );
};

export default TimeCell;
