import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import TableActions from 'components/TableActions/TableActions';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const schema = ['status','name', 'creationTimestamp'];

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
        clusterID,
        namespaceID,
        data,
        removeCicd,
        setRunDialog,
      }) => (
        <Fragment>
          <Button 
            onClick={() => setRunDialog(data.get('id'))} action  
            disabled={data.get('deletionTimestamp')}>
            <FormattedMessage {...messages.tableButtonRun} />
          </Button>,
          <Button
            action
            to={`/clusters/${clusterID}/namespaces/${namespaceID}/cicds/${data.get('id')}/update`}
            component={Link}
            disabled={data.get('status') === 'Deleting'}
          >
            <FormattedMessage {...messages.tableButtonModify} />
          </Button>

          <TableActions 
            actions={
              [
                <ConfirmDelete
                  actionName={removeCicd }
                  id={data.get('id')}
                  url={data.getIn(['links', 'remove'])}
                  clusterID={clusterID}
                  namespaceID={namespaceID}
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
            color="primary"
            component={Link}
            to={`${pathname}/${data.get('id')}/show`}
          >
            {data.get('name')}
          </Button>
        ),
      };
    }
    return sch;
  })
  ;

export default tableSchema;
