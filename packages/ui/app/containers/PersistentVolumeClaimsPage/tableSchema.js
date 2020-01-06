import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import Chip from '@material-ui/core/Chip';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const schema = [
  'used',
  'name',
  'actualStorageSize',
  'pods',
  'node',
  'storageClassName',
];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((item) => {
    if (item.id === 'pods') {
      return {
        ...item,
        component({ value }) {
          return value != null
            ? value
                .map((val, key) => <Chip key={key} label={`${val}`} />)
                .toList()
            : null;
        },
      };
    }
    if (item.id === 'used') {
      return {
        ...item,
        component({ data }) {
          const isUsed = data.get('used');
          return isUsed ? (
            <span>
              <FormattedMessage {...messages.tableContentUsed} />
            </span>
          ) : (
            <span>
              <FormattedMessage {...messages.tableContentUnused} />
            </span>
          );
        },
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
        removePersistentVolumeClaim,
        setError,
      }) => (
        <Fragment>
          <ConfirmDelete
            actionName={removePersistentVolumeClaim}
            id={data.get('id')}
            url={data.getIn(['links', 'remove'])}
            clusterID={clusterID}
            namespaceID={namespaceID}
            reject={(e) => setError(e)}
          />
        </Fragment>
      ),
    },
  ])
  .map((sch) => sch);
export default tableSchema;
