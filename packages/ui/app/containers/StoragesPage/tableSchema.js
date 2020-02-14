import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const schema = [
  'storageType',
  'phase',
  'hosts',
  'size',
  'usedSize',
  'freeSize',
];

const tableSchema = schema
  .map((id) => {
    if (id === 'hosts') {
      return {
        id,
        label: ucfirst(id),
        component: (props) => (
          <span>{props.data.get('hosts') && props.data.get('hosts').size}</span>
        ),
      };
    }
    return {
      id,
      label: ucfirst(id),
    };
  })
  .concat([
    {
      id: 'actions',
      label: 'Actions',
      component: ({
        pathname,
        data,
        removeStorageCluster,
        clusterID,
        setError,
      }) => (
        <Fragment>
          <Button
            action
            component={Link}
            to={`${pathname}/${data.get('id')}/edit`}
          >
            <FormattedMessage {...messages.editButton} />
          </Button>

          <ConfirmDelete
            actionName={removeStorageCluster}
            id={data.get('id')}
            url={data.getIn(['links', 'remove'])}
            clusterID={clusterID}
            reject={(e) => setError(e)}
          />
        </Fragment>
      ),
    },
  ])
  .map((sch) => {
    if (sch.id === 'storageType') {
      return {
        ...sch,
        component: (props) => (
          <Button
            link
            component={Link}
            to={`${props.pathname}/${props.data.get('id')}/show`}
          >
            {props.data.get('storageType')}
          </Button>
        ),
      };
    }
    return sch;
  });
export default tableSchema;
