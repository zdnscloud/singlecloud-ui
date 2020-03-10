import React, { PureComponent, Fragment, useState } from 'react';

import TrueIcon from 'components/Icons/True';
import FalseIcon from 'components/Icons/False';
import CloseIcon from '@material-ui/icons/Close';
import HookIcon from 'components/Icons/Hook';
import HourglassIcon from 'components/Icons/Hourglass';
import LoaddingIcon from '../images/loadding.gif';
import RunningIcon from '../images/running.gif';
import RunningHlIcon from '../images/runningHl.gif';


export const returnActiveStyle = (cSt,classes) => {
  switch (true) {
    case cSt === 'Failed':
      return  classes.redBtn;
    case cSt === 'Running':
      return classes.blueBtn;;
    case cSt === 'Succeeded':
      return classes.greenBtn;
    case cSt === 'Pending':
      return classes.grayBtn;
    default:
      break;
  }
  return classes.grayBtn;
};

export const returnActiveIcon = (cSt,type) => {
  switch (true) {
    case cSt === 'Failed':
      return  <FalseIcon  style={{color: type === 'list'? '#fff' :'#F5222D'}} />;
    case cSt === 'Running':
      return <img src={type === 'list'? RunningIcon:RunningHlIcon } alt='icon' style={{width:22}} />;
    case cSt === 'Succeeded':
      return  <TrueIcon  style={{color: type === 'list'? '#fff' :'#389E0D'}} /> ;
    case cSt === 'Pending':
      return  <TrueIcon  style={{color: type === 'list'? '#fff' :'#389E0D'}} />;;
    default:
      break;
  }
  return null;
};


export const returnActiveColor = (cSt,classes) => {
  switch (true) {
    case cSt === 'Failed':
      return classes.red;
    case cSt === 'Running':
      return classes.blue;
    case cSt === 'Succeeded':
      return classes.green;
    case cSt === 'Pending':
      return classes.gray;
    default:
      break;
  }
  return classes.gray;
};

export const returnStatusIcon = (cSt,classes) => {
  switch (true) {
    case cSt === 'Failed':
      return <CloseIcon />;
    case cSt === 'Succeeded':
      return <HookIcon className={classes.hookIcon} />;
    case cSt === 'Running':
      return <img src={LoaddingIcon} alt='LoaddingIcon' style={{width:20}} />;
    default:
      break;
  }
  return <HourglassIcon  className={classes.hourglassIcon} />;
};
