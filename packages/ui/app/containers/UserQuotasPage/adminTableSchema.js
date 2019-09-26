import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import IconButton from 'components/CustomIconButtons/IconButton';
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
            reject={(e) => props.setError(e)}
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
            link
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
            case 'approval':
              return <FormattedMessage {...messages.tableApproval} />;
            case 'rejection':
              return <FormattedMessage {...messages.tableRejection} />;
            default:
              return props.data.get('status');
          }
        },
      };
    }
    return sch;
  });
export default adminTableSchema;
