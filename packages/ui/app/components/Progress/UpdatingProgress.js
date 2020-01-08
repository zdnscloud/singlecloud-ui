import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const style = (theme) => ({
  created: {
    backgroundColor: '#52C41A',
  },
  uncreated: {
    backgroundColor: '#B7EB8F',
  },
  updated: {
    backgroundColor: '#1890FF',
  },
  unupdated: {
    backgroundColor: '#91D5FF',
    backgroundImage: 'none',
    animation: 'none',
  },
  updating: {
    backgroundColor: '#F7B500',
  },
});

const useStyles = makeStyles(style);

/**

#52C41A 创建完成
#B7EB8F 待创建
#1890FF 升级完成
#91D5FF 待升级
#F7B500 升级中
#F5222D 升级失败

 */

const UpdatingProgress = ({ isUpdating, total, current, buffer }) => {
  const classes = useStyles();
  const variant = isUpdating ? 'buffer' : 'determinate';
  const value = (current / total) * 100;
  const valueBuffer = ((current + buffer) / total) * 100;

  return (
    <LinearProgress
      variant={variant}
      classes={{
        determinate: classes.uncreated,
        bar1Determinate: classes.created,
        dashed: classes.unupdated,
        dashedColorPrimary: classes.unupdated,
        bar1Buffer: classes.updated,
        bar2Buffer: classes.updating,
      }}
      value={value}
      valueBuffer={valueBuffer}
    />
  );
};

export default UpdatingProgress;
