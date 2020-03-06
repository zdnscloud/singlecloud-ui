import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import Button from '@material-ui/core/Button';

import TrueIcon from 'components/Icons/True';
import FalseIcon from 'components/Icons/False';

import messages from '../messages';
import useStyles from '../styles';

export const TaskList = ({
  workFlowTask,
  currentStatus,
  workFlowsTaskID,
  workFlowTasksList,
  setWorkFlowTask,
  changeTask,
}) => {
  const classes = useStyles();
 
  return (
    <Fragment>
      <List className={classes.list}>
        {workFlowTasksList && workFlowTasksList.toList().map((t,i)=>{
          const cStatus = t.getIn(['status','currentStatus']);
          return  (
            <ListItem 
              className={cStatus === 'Failed' ? classes.fails :classes.success} key={i}
              onClick={()=>{
                changeTask(t);
              }}
            >
              <ListItemAvatar>
                {cStatus === 'Failed' ?  <FalseIcon /> :  <TrueIcon />}
              </ListItemAvatar>
              <ListItemText primary={t.get('id')} />
            </ListItem>
          )
        }
        )
        }
      </List>
    </Fragment>
  );
};

export default TaskList;
