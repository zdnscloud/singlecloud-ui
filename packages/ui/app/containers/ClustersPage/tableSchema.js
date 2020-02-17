import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import TimeCell from 'components/Cells/TimeCell';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const schema = ['status', 'name', 'nodeCount', 'creationTimestamp'];

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
      component: ({ classes, data, removeCluster, setError }) => (
        <Fragment>
          <Button
            action
            className={classes.button}
            to={`/clusters/${data.get('id')}/manage`}
            component={Link}
            disabled={data.get('status') === 'Deleting'}
          >
            <FormattedMessage {...messages.manageButton} />
          </Button>
          <ConfirmDelete
            actionName={removeCluster}
            id={data.get('id')}
            url={data.getIn(['links', 'remove'])}
            reject={(e) => setError(e)}
          />
        </Fragment>
      ),
    },
  ])
  .map((sch) => {
    if (sch.id === 'name') {
      return {
        ...sch,
        component: ({ data }) =>
          data.get('status') === 'Running' ? (
            <Button
              link
              to={`/clusters/${data.get('id')}/show`}
              component={Link}
            >
              {data.get('name')}
            </Button>
          ) : (
            data.get('name')
          ),
      };
    }
    return sch;
  });

export default tableSchema;
