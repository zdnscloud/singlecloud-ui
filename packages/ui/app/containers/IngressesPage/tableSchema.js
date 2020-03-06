import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import Button from 'components/CustomButtons/Button';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';

const schema = ['name', 'host', 'port', 'maxBodySize', 'creationTimestamp'];

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
    if (item.id === 'maxBodySize') {
      return {
        ...item,
        component: ({ data }) => (
          <span>
            {data.get('maxBodySize')} {data.get('maxBodySizeUnit')}
          </span>
        ),
      };
    }
    if (item.id === 'host') {
      return {
        ...item,
        component: ({ data }) => (
          <Button
            link
            onClick={() =>
              window.open(`http://${data.getIn(['rules', 0, 'host'])}`)
            }
          >
            {data.getIn(['rules', 0, 'host'])}
          </Button>
        ),
      };
    }
    if (item.id === 'port') {
      return {
        ...item,
        component({ data }) {
          const value = data.get('rules');
          return value != null
            ? value
              .map((val, key) => (
                <Chip key={key} label={`${val.get('servicePort')}`} />
              ))
              .toList()
            : null;
        },
      };
    }
    return item;
  })
  .concat([
    {
      id: 'actions',
      label: 'Actions',
      component: ({data,namespaceID,clusterID,removeIngress}) => (
        <Fragment>
          <ConfirmDelete
            actionName={removeIngress}
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
