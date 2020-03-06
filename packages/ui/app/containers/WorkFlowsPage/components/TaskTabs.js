import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import LogView from 'components/Log/LogView';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import TrueIcon from 'components/Icons/True';
import FalseIcon from 'components/Icons/False';

import messages from '../messages';
import useStyles from '../styles';

export const TaskStepper = ({
  workFlowTask,
  currentStatus,
  workFlowsTaskID,
  logs,
}) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const status = workFlowTask && workFlowTask.get('status');
  // console.log('status',status && status.toJS());
  // console.log('logs22',logs);
  return (
    <Fragment>
      <div className={classes.titleWrap}>
        <h4>
          {currentStatus === 'Failed' ? <FalseIcon  style={{color:'#F5222D'}} /> : <TrueIcon  style={{color:'#389E0D'}} />}
          {workFlowsTaskID}
          {currentStatus === 'Failed' ? null:<span><FormattedMessage {...messages.completed} /></span>}
        </h4>
        <Button
          variant="contained"
        >
          <FormattedMessage {...messages.clearLogs} />
        </Button>
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
              )) 
              }
            </div>
          )}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default TaskStepper;
