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
  'namespace',
  'cpu',
  'memory',
  'storage',
  'creationTimestamp',
  'responseTimestamp',
];

const tableSchema = schema
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
      component: ({ data, classes }) => (
        <Fragment>
          <Button
            className={classes.detailsBtn}
            action
            to={`/userQuotas/${data.get('id')}/show`}
            component={Link}
            disabled={data.get('deletionTimestamp')}
          >
            <FormattedMessage {...messages.quotaDetailsBtn} />
          </Button>
          <Button
            action
            to={`/userQuotas/${data.get('id')}/edit`}
            component={Link}
            disabled={data.get('status') === 'processing' || data.get('deletionTimestamp') }
          >
            <FormattedMessage {...messages.quotaAdjustmentBtn} />
          </Button>
        </Fragment>
      ),
    },
  ])
  .map((sch) => {
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

export default tableSchema;
