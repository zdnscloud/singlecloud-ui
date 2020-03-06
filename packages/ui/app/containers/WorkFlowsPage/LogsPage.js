/**
 *
 * LogsPage
 *
 */
import React, { useEffect, useState, memo,useCallback } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { fromJS } from 'immutable';

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import TrueIcon from 'components/Icons/True';
import FalseIcon from 'components/Icons/False';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectCurrentID,
  makeSelectCurrent,
  makeSelectURL as makeSelectWorkFlowsURL,
} from 'ducks/workFlows/selectors';
import {
  makeSelectURL,
  makeSelectWorkFlowTasks,
} from 'ducks/workFlowTasks/selectors';
import * as actions from 'ducks/workFlowTasks/actions';
import * as wActions from 'ducks/workFlows/actions';

import { useLogs } from 'hooks/logs';
import useStyles from './styles';
import messages from './messages';


import TaskTabs from './components/TaskTabs';
import TaskStatus from './components/TaskStatus';
import TaskList from './components/TaskList';

const LogsPage = ({
  clusterID,
  namespaceID,
  location,
  workFlowsURL,
  url,
  readWorkFlowTask,
  workFlowID,
  readWorkFlow,
  workFlow,
  loadWorkFlowTasks,
  workFlowTasksList,
}) => {
  const classes = useStyles();
  const firstWorkFlowTask = workFlowTasksList && workFlowTasksList.first();

  const [workFlowTask, setWorkFlowTask] = useState(null);
  const [taskLogs, settaskLogs] = useState(null);

  const workFlowsTaskURL = workFlowTask && workFlowTask.getIn(['links','self']);
  const workFlowsTaskID = workFlowTask && workFlowTask.get('id');
  const currentStatus =  workFlowTask && workFlowTask.getIn(['status','currentStatus']);

  const { protocol, hostname, port } = window.location;
  const { open, close, logs } = useLogs();

  useEffect(() => { 
    if(firstWorkFlowTask && firstWorkFlowTask.size>0){
      setWorkFlowTask(firstWorkFlowTask);
      changeTask(firstWorkFlowTask);
    };
  }, [changeTask, firstWorkFlowTask]);

  useEffect(() => {
    if (workFlowsURL) {
      readWorkFlow(workFlowID, {
        clusterID,
        namespaceID,
        url: `${workFlowsURL}/${workFlowID}`,
      });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [clusterID, namespaceID, readWorkFlow, workFlowID, workFlowsURL]);

  useEffect(() => {
    if (workFlowsTaskURL) {
      readWorkFlowTask(workFlowsTaskURL, {
        clusterID,
        namespaceID,
        workFlowID,
        url: `${workFlowsTaskURL}`,
        // resolve(res) {
        //   if (res.response) {
        //     setWorkFlowTask(fromJS(res.response));
        //     // console.log('logUrl',logUrl);
        //     // open(logUrl);
        //   }
        // },
        // reject() {},
      });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [clusterID, namespaceID, readWorkFlowTask, workFlowID, workFlowsTaskURL]);

  useEffect(() => {
    if (url) {
      loadWorkFlowTasks(url, {
        clusterID,
        namespaceID,
        workFlowID,
      });
    }
    const t = setInterval(() => {
      if (url) {
        loadWorkFlowTasks(url, {
          clusterID,
          namespaceID,
          workFlowID,
        });
      }
    }, 63000);

    return () => {
      clearInterval(t);
    };
  }, [clusterID, loadWorkFlowTasks, namespaceID, url, workFlowID]);

  const changeTask = useCallback((task) => {
    close();
    setWorkFlowTask(task);
    const taskID = task && task.get('id');
    if(taskID){
      const logUrl = `${
        protocol === 'https:' ? 'wss:' : 'ws:'
      }//${hostname}:${port}/apis/ws.zcloud.cn/v1/clusters/${clusterID}/namespaces/${namespaceID}/workflows/${workFlowID}/workflowtasks/${taskID}/log`;
      console.log('logUrl',logUrl);
      open(logUrl);
    }
  }, [close, clusterID, hostname, namespaceID, open, port, protocol, workFlowID]);


  return (
    <div className={classes.root}>
      <Helmet title={messages.logsPageTitle} description={messages.logsPageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/workFlows`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.logsPageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <TaskStatus 
            workFlowID={workFlowID} 
            workFlowTask={workFlowTask}
          />
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4 style={{border:'none'}}>
                  {workFlowsTaskID}
                </h4>
              </CardHeader>
              <CardBody>
                <div className={classes.taskContent}>
                  <div className={classes.taskList}>
                    <TaskList 
                      workFlowTasksList={workFlowTasksList}
                      changeTask={changeTask}
                    />
                  </div>
                  <div className={classes.tasktabs}>
                    <TaskTabs 
                      workFlowTask={workFlowTask}
                      currentStatus={currentStatus}
                      workFlowsTaskID={workFlowsTaskID}
                      logs={logs}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  workFlowsURL:makeSelectWorkFlowsURL(),
  url: makeSelectURL(),
  workFlow: makeSelectCurrent(),
  workFlowID:makeSelectCurrentID(),
  workFlowTasksList:makeSelectWorkFlowTasks(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      readWorkFlow:wActions.readWorkFlow,
    },
    dispatch,
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
)(LogsPage);
