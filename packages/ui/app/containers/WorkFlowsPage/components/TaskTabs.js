import React, { PureComponent, Fragment, useState ,useEffect} from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import LogView from 'components/Log/LogView';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import { useLogs } from 'hooks/logs';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Confirm from 'components/Confirm/Confirm';

import { returnActiveIcon, returnActiveColor } from '../utils/utils';

import messages from '../messages';
import useStyles from '../styles';

export const TaskTabs = ({
  workFlowTask,
  workFlowsTaskID,
  clearTasks,
  logUrl,
}) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const { open, close, logs } = useLogs();
  const currentStatus = workFlowTask && workFlowTask.getIn(['status','currentStatus']);
  const status = workFlowTask && workFlowTask.get('status');
  
  useEffect(()=>{
    if(logUrl){
      open(logUrl);
    };
    return () =>{
      close();
    };
  },[close, logUrl, open]);
  


  return (
    <Fragment>
      <div className={classes.titleWrap}>
        <h4>
          {returnActiveIcon(currentStatus,classes)}
          {workFlowsTaskID}
          <span className={returnActiveColor(currentStatus,classes)}>{currentStatus}</span>
        </h4>
        <Confirm
          handleConfirm={clearTasks}
          dialogContentText={messages.clearTasksPromptText}
          component={
            <Button
              variant="contained"
            >
              <FormattedMessage {...messages.clearTasks} />
            </Button>
          }
        />
      </div>
      <Card>
        <CardHeader style={{ paddingLeft:0 }}>
          <h4 className={classes.customCardHeaderH4}>
            <Tabs
              value={tab}
              onChange={(evt, idx) => setTab(idx)}
              textColor="inherit"
              classes={{
                indicator: classes.indicator,
              }}
            >
              <Tab
                label={<FormattedMessage {...messages.tabTitleLogs} />}
              />
              <Tab
                label={<FormattedMessage {...messages.tabTitleStatus} />}
              />
            </Tabs>
          </h4>
        </CardHeader>
        <CardBody style={{ paddingLeft:0 }}>
          {tab === 0 ? (
            <Paper className={classes.logPaper}>
              {logs && logs.length>0 ? <LogView logs={logs} />: null}
            </Paper>
          ) : (
            <div>
              <p><FormattedMessage {...messages.tabContainerStatus} />:</p>
              {status && status.map((st,idx)=> (
                <div key={idx}>
                  <p>{idx} : {st}</p>
                </div>
              )).toList() 
              }
            </div>
          )}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default TaskTabs;
