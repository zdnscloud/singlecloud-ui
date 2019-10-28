import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import Chip from '@material-ui/core/Chip';
import TimeCell from 'components/Cells/TimeCell';
import { fromJS } from 'immutable';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';

const schema = ['name', 'address', 'roles'];

const nodeTableSchema = schema
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
      component({ setNodes, index, nodes }) {
        return (
          <Fragment>
            <ConfirmDelete
              actionName={() => {
                setNodes(nodes.splice(index, 1));
              }}
              id={index}
            />
          </Fragment>
        );
      },
    },
  ]);
export default nodeTableSchema;
