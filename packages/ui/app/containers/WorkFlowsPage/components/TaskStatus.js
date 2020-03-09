import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import HourglassIcon from 'components/Icons/Hourglass';
import BlankIcon from 'components/Icons/Blank';
import StatusArrowIcon from 'components/Icons/StatusArrow';
import HookIcon from 'components/Icons/Hook';

import { returnActiveStyle } from '../utils/utils';
import messages from '../messages';
import useStyles from '../styles';

export const TaskStatus = ({
  workFlowID,
  workFlowTask,
  workFlowTasksList,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = React.useRef();

  const subTasks = workFlowTask && workFlowTask.get('subTasks');

  const returnLodding = (cSt) => {
    if(cSt === 'Running'){
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        timer.current = setTimeout(() => {
          setSuccess(true);
          setLoading(false);
        }, 2000);
      }
      return <CircularProgress size={68} thickness={1.5} className={classes.fabProgress} />
    }
    return null;
  };

  const returnIcon = (cSt) => {
    switch (true) {
      case cSt === 'Failed':
        return <CloseIcon />;
      case cSt === 'Succeeded':
        return <HookIcon className={classes.hookIcon} />;
      default:
        break;
    }
    return <HourglassIcon  className={classes.hourglassIcon} />;
  };

  return (
    <Fragment>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader>
            <h4>
              {workFlowID}
            </h4>
          </CardHeader>
          <CardBody>
            {workFlowTasksList.size > 0 ? <div className={classes.taskStatus}>
              {subTasks && subTasks.map((s,i)=>{
                const currentStatus = s.getIn(['status','currentStatus']);
                return (
                  <div key={i} className={classes.statusContent}>
                    <div className={classes.statusWrap}>
                      <Fab
                        className={returnActiveStyle(currentStatus,classes)}
                        style={{border:'5px solid #fff'}}
                      >
                        {returnIcon(currentStatus)}
                      </Fab>
                      {returnLodding(currentStatus)}
                    </div>
                    <div className={classes.statusWrap}>
                      <p
                        className={returnActiveStyle(currentStatus,classes)}
                      >{s.get('name')}</p>
                    </div>
                    {i === 0 ? <div className={classes.statusArrow}>
                      <StatusArrowIcon className={classes.statusArrow} />
                    </div>: null}
                  </div>
                )
              })}
            </div> : <div className={classes.blank}>
              <BlankIcon />
              <p className={classes.blankText}>暂无内容</p>
            </div>}
          </CardBody>
        </Card>
      </GridItem>
    </Fragment>
  );
};

export default TaskStatus;
