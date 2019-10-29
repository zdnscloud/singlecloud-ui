import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import IconButton from 'components/CustomIconButtons/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TimeCell from 'components/Cells/TimeCell';
import ShellIcon from 'components/Icons/Shell';
import DetailsIcon from 'components/Icons/Details';
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
      component: ({ data, removeUserQuota, setError }) => (
        <Fragment>
          <IconButton
            variant="outlined"
            size="small"
            to={`/userQuotas/${data.get('id')}/request`}
            component={Link}
            disabled={data.get('status') === 'Deleting'}
          >
            <DetailsIcon />
          </IconButton>
          <ConfirmDelete
            actionName={removeUserQuota}
            id={data.get('id')}
            url={data.getIn(['links', 'remove'])}
            reject={(e) => setError(e)}
          />
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
export default adminTableSchema;
