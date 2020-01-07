import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const style = (theme) => ({});

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

  return <LinearProgress variant={variant} />;
};

export default UpdatingProgress;
