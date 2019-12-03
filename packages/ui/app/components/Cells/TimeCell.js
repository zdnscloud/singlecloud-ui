import React from 'react';
import dayjs from 'dayjs';

const TimeCell = ({ value }) => {
  if (value == null) return 'N/A';
  const time = dayjs(value);
  const format = 'YYYY-MM-DD HH:mm:ss';

  return (
    <time dateTime={value} style={{ minWidth: 140, display: 'inline-block' }}>
      {time.format(format)}
    </time>
  );
};

export default TimeCell;
