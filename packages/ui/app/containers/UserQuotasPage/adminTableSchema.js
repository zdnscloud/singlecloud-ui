import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TimeCell from 'components/Cells/TimeCell';
import ShellIcon from 'components/Icons/Shell';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const schema = [
  'status',
  'userName',
  'namespace',
  'cpu',
  'memory',
  'storage',
  'creationTimestamp',
  'responseTimestamp',
];

const adminTableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((item) => {
    if (item.id === 'creationTimestamp' || item.id === 'responseTimestamp') {
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
      component: (props) => (
        <Fragment>
          <ConfirmDelete
            actionName={props.removeUserQuota}
            id={props.data.get('id')}
            url={props.data.getIn(['links', 'remove'])}
          />
        </Fragment>
      ),
    },
  ])
  .map((sch) => {
    if (sch.id === 'namespace') {
      return {
        ...sch,
        component: (props) => (
          <Button
            color="primary"
            to={`/userQuotas/${props.data.get('id')}/request`}
            component={Link}
          >
            {props.data.get('name')}
          </Button>
        ),
      };
    }
    if (sch.id === 'status') {
      return {
        ...sch,
        component: (props) => {
          switch (props.data.get('status')) {
            case 'processing':
              return <FormattedMessage {...messages.tableProcessing} />;
              break;
            case 'approval':
              return <FormattedMessage {...messages.tableApproval} />;
              break;
            case 'rejection':
              return <FormattedMessage {...messages.tableRejection} />;
              break;
            default:
              return props.data.get('status');
              break;
          }
        },
      };
    }
    return sch;
  });
export default adminTableSchema;
