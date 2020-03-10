import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import TableActions from 'components/TableActions/TableActions';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const schema = ['name','status'];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .concat([
    {
      id: 'actions',
      label: 'Actions',
      component: ({
        clusterID,
        namespaceID,
        data,
        removeWorkFlow,
        setRunDialog,
      }) => (
        <Fragment>
          <Button 
            onClick={() => setRunDialog(data)} action  
            disabled={data.get('deletionTimestamp')}>
            <FormattedMessage {...messages.tableButtonRun} />
          </Button>
          <Button
            action
            to={`/clusters/${clusterID}/namespaces/${namespaceID}/workFlows/${data.get('id')}/update`}
            component={Link}
            disabled={data.get('deletionTimestamp')}
          >
            <FormattedMessage {...messages.tableButtonModify} />
          </Button>

          <TableActions 
            actions={
              [
                <Button
                  action
                  to={`/clusters/${clusterID}/namespaces/${namespaceID}/workFlows/${data.get('id')}/logs`}
                  component={Link}
                  disabled={data.get('deletionTimestamp')}
                >
                  <FormattedMessage {...messages.logs} />
                </Button>,
                <ConfirmDelete
                  actionName={removeWorkFlow }
                  id={data.get('id')}
                  url={data.getIn(['links', 'remove'])}
                  clusterID={clusterID}
                  namespaceID={namespaceID}
                  disabled={data.get('deletionTimestamp')}
                />,
              ]}
          />
        </Fragment>
      ),
    },
  ])
  .map((sch) => {
    if (sch.id === 'name') {
      return {
        ...sch,
        component: ({ pathname, data }) => (
          <Button
            link
            component={Link}
            to={`${pathname}/${data.get('id')}/show`}
          >
            {data.get('name')}
          </Button>
        ),
      };
    };
    if (sch.id === 'status') {
      return {
        ...sch,
        component: ({data }) => (
          <span
          >
            {data.getIn(['status','currentStatus']) !== ''? data.getIn(['status','currentStatus']) : '--'} 
          </span>
        ),
      };
    }
    return sch;
  })
  ;

export default tableSchema;
