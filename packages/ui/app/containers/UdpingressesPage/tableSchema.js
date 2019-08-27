import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';

const schema = ['serviceName'];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  // .map((item) => {
  //   if (item.id === 'creationTimestamp') {
  //     return {
  //       ...item,
  //       component: TimeCell,
  //     };
  //   }
  //   return item;
  // })
  .concat([
    {
      id: 'actions',
      label: 'Actions',
      component: (props) => (
        <Fragment>
          <ConfirmDelete
            actionName={props.removeUdpingress}
            id={props.data.get('id')}
            url={props.data.getIn(['links', 'remove'])}
            clusterID={props.clusterID}
            namespaceID={props.namespaceID}
          />
        </Fragment>
      ),
    },
  ])
  .map((sch) => {
    if (sch.id === 'serviceName') {
      return {
        ...sch,
        component: (props) => (
          <Button
            link
            component={Link}
            to={`${props.pathname}/${props.data.get('id')}/show`}
          >
            {props.data.get('serviceName')}
          </Button>
        ),
      };
    }
    return sch;
  });
export default tableSchema;
