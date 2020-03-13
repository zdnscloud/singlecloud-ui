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

import messages from '../messages';
import useStyles from '../styles';
import { returnActiveStyle ,returnActiveIcon} from '../utils/utils';

export const TaskList = ({
  workFlowTasksList,
  changeTask,
}) => {
  const classes = useStyles();
 
  return (
    <Fragment>
      <List className={classes.list}>
        {workFlowTasksList && workFlowTasksList.toList().map((task,i)=>{
          const cSt = task.getIn(['status','currentStatus']);
          return  (
            <ListItem 
              className={returnActiveStyle(cSt,classes)} key={i}
              onClick={()=>{
                changeTask(task);
              }}
              style={{boxShadow:'0px -1px 0px 0px rgba(0,0,0,0.09)'}}
            >
              <ListItemAvatar>
                {returnActiveIcon(cSt,'list')}
              </ListItemAvatar>
              <ListItemText primary={task.get('id')} />
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
