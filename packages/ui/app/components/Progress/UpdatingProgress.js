import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from 'components/CustomButtons/Button';
import IconButton from 'components/CustomIconButtons/IconButton';
import UpgradeIcon from 'components/Icons/Upgrade';
import RollbackIcon from 'components/Icons/Rollback';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import LogcollectionDialog from 'containers/LogcollectionPage/LogcollectionDialog';
import MetricsDialog from 'containers/MetricsPage/MetricsDialog';

/**

#52C41A 创建完成
#B7EB8F 待创建
#1890FF 升级完成
#91D5FF 待升级
#F7B500 升级中
#F5222D 升级失败

 */

const UpdatingProgress = ({

}) => {

  return (
    <LinearProgress
      variant="determinate"
    />
  );
};

export default UpdatingProgress;
