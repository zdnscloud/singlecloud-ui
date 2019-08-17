import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const schema = ['host','path','serviceName','servicePort'];

const ruleTableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((item) => {
    if (item.id === 'creationTimestamp') {
      return {
        ...item,
        component: TimeCell,
      };
    }
    return item;
  })
  .concat([
    {
      id: 'protocol',
      label: 'Protocol',
      component: (props) => (
        <span>HTTP</span>
      ),
    },
    {
      id: 'serviceProtocol',
      label: 'ServiceProtocol',
      component: (props) => (
        <span>tcp</span>
      ),
    },
  ])
export default ruleTableSchema;
