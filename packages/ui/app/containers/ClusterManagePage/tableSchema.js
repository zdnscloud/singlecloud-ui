import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import Chip from '@material-ui/core/Chip';
import TimeCell from 'components/Cells/TimeCell';
import { fromJS } from 'immutable';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';

const schema = [
  'name',
  'address',
  'roles',
];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((item) => {
    if (item.id === 'roles') {
      return {
        ...item,
        component({ value }) {
          return value
            .map((val, key) => <Chip key={key} label={`${val}`} />)
            .toList();
        },
      };
    }
    if (item.id === 'labels') {
      return {
        ...item,
        component({ value }) {
          return value
            .map((val, key) => <Chip key={key} label={`${key}=${val}`} />)
            .toList();
        },
      };
    }
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
      id: 'actions',
      label: 'Actions',
      component(props) {
        return (<Fragment>
          <ConfirmDelete 
              actionName={props.setNodes}
              id={fromJS(props.nodes.toJS().filter((v) => v.name !== props.data.get('name')))}
           />
        </Fragment>)
      },
    },
  ])
;

export default tableSchema;
