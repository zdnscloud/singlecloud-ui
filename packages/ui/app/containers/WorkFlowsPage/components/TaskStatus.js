import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import HourglassIcon from 'components/Icons/Hourglass';

import messages from '../messages';
import useStyles from '../styles';

export const TaskStatus = ({
  workFlowID,
  workFlowTask,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = React.useRef();

  const subTasks = workFlowTask && workFlowTask.get('subTasks');

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
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
            <div className={classes.taskStatus}>
              {subTasks && subTasks.map((s,i)=>(
                <div key={i}>
                  <div className={classes.statusWrap}>
                    <Fab
                      className={classes.buttonClassname}
                    >
                      {success ? <HourglassIcon /> : <HourglassIcon />}
                    </Fab>
                    {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                  </div>
                  <div className={classes.statusWrap}>
                    <Button
                      variant="contained"
                      className={classes.buttonClassname}
                      disabled={loading}
                      onClick={()=>handleButtonClick()}
                    >{s.get('name')}</Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </Fragment>
  );
};

export default TaskStatus;
