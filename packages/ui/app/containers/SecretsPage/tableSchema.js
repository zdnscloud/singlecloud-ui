import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const schema = ['name'];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .concat([
    {
      id: 'data',
      label: 'Count',
      component: (props) => {
        const configs = props.data.get('data');
        if (configs) return configs.size;
        return 0;
      },
    },
    {
      id: 'actions',
      label: 'Actions',
      component: ({data,clusterID,namespaceID,removeSecret}) => (
        <Fragment>
          <Button
            action
            component={Link}
            to={`/clusters/${clusterID}/namespaces/${
              namespaceID
            }/secrets/${data.get('id')}/edit`}
            disabled={data.get('deletionTimestamp')}
          >
            <FormattedMessage {...messages.editButton} />
          </Button>
          <ConfirmDelete
            actionName={removeSecret}
            id={data.get('id')}
            url={data.getIn(['links', 'remove'])}
            clusterID={clusterID}
            namespaceID={namespaceID}
            disabled={data.get('deletionTimestamp')}
          />
        </Fragment>
      ),
    },
  ])
  .map((sch) => {
    if (sch.id === 'name') {
      return {
        ...sch,
        component: ({data,clusterID,namespaceID,classes}) => 
          data.get('deletionTimestamp') ? (
            <span className={ data.get('deletionTimestamp') ? classes.strikeout : null}>{ data.get('name')}</span>
          ) :(
            <Button
              link
              to={`/clusters/${clusterID}/namespaces/${
                namespaceID
              }/secrets/${data.get('id')}/show`}
              component={Link}
            >
              {data.get('name')}
            </Button>
          ),
      };
    }
    return sch;
  });

export default tableSchema;
