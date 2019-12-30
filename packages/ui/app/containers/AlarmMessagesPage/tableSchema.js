import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';

const schema = ['name', 'creationTimestamp'];

const tableSchema = schema
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
      id: 'actions',
      label: 'Actions',
      component: ({
        // clusterID,
        // namespaceID,
        data,
        removeCluster,
      }) => (
        <Fragment>
          <ConfirmDelete
            actionName={removeCluster}
            id={data.get('id')}
            url={data.getIn(['links', 'remove'])}
            // clusterID={clusterID}
            // namespaceID={namespaceID}
          />
        </Fragment>
      ),
    },
  ])
  .map((sch) => sch);
export default tableSchema;
