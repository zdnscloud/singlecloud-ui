import React from 'react';
import dayjs from 'dayjs';

import useStyles from './styles';

const LogView = ({ logs = [] }) => {
  const classes = useStyles();

  return (
    <div className={classes.logsWrapper}>
      <pre className={classes.logs}>
        {logs.map((log, i) => {
          const idx = log.indexOf(' ');
          const t = log.slice(0, idx);
          const l = log.slice(idx + 1);
          // this remove shell control attribute
          const ll = l.replace(/\x1b\[\d{1,2}(;\d{1,2})*m/g, ''); // eslint-disable-line
          return (
            <div key={i}>
              <time className={classes.logTime}>
                {dayjs(t).format('YYYY-MM-DD HH:mm:ss')}
              </time>
              <span className={classes.log}>{ll}</span>
            </div>
          );
        })}
      </pre>
    </div>
  );
};

export default LogView;
