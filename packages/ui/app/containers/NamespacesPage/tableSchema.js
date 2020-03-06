import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import TimeCell from 'components/Cells/TimeCell';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const schema = ['name', 'creationTimestamp'];

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
      component: ({data,removeNamespace,clusterID}) => (
        <Fragment>
          <ConfirmDelete
            actionName={removeNamespace}
            id={data.get('id')}
            url={data.getIn(['links', 'remove'])}
            clusterID={clusterID}
            disabled={data.get('deletionTimestamp')}
          />
          {/* <Button
            action
            to={`${props.pathname}/${props.data.get('id')}/edit`}
            component={Link}
          >
            <FormattedMessage {...messages.editButton} />
          </Button> */}
        </Fragment>
      ),
    },
  ])
  .map((sch) => {
    if (sch.id === 'name') {
      return {
        ...sch,
        component: ({data,classes,pathname}) => 
          data.get('deletionTimestamp') ? (
            <span className={ data.get('deletionTimestamp') ? classes.strikeout : null}>{ data.get('name')}</span>
          ) : 
            (
              <Button
                link
                component={Link}
                to={`${pathname}/${data.get('id')}/show`}
              >
                {data.get('name')}
              </Button>
            ),
      };
    }
    return sch;
  });
export default tableSchema;
