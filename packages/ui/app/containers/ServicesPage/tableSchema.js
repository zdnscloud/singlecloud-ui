import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';

const schema = [
  'name',
  'serviceType',
  'clusterIP',
  'exposedPorts',
  'creationTimestamp',
];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((item) => {
    if (item.id === 'exposedPorts') {
      return {
        ...item,
        component: ({ data, value }) => (
          <Fragment>
            {value
              .map((p) =>
                p.get('nodePort')
                  ? `${p.get('port')}/${p.get('protocol')}/${p.get('nodePort')}`
                  : `${p.get('port')}/${p.get('protocol')}`
              )
              .join(', ')}
          </Fragment>
        ),
      };
    }
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
      component: ({data,removeService,clusterID,namespaceID}) => (
        <Fragment>
          <ConfirmDelete
            actionName={removeService}
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
        component: ({ data, pathname,classes}) => 
          data.get('deletionTimestamp') ? (
            <span className={ data.get('deletionTimestamp') ? classes.strikeout : null}>{ data.get('name')}</span>
          ) :(
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
