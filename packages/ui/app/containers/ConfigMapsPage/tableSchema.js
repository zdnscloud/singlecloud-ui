import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';

const schema = ['name'];

const tableSchema = schema
.map((id) => ({
  id,
  label: ucfirst(id),
}))
.concat([
  {
    id: 'configs',
    label: 'Count',
    component: (props) => {
      const configs = props.data.get('configs');
      if (configs) return configs.size;
      return 0;
    },
  },
  {
    id: 'actions',
    label: 'Actions',
    component: (props) => (
      <Fragment>
        <ConfirmDelete 
            actionName={props.removeConfigMap}
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
  if (sch.id === 'name') {
    return {
      ...sch,
      component: (props) => (
        <Button
          color="primary"
          to={`/clusters/${props.clusterID}/namespaces/${props.namespaceID}/configmaps/${props.data.get(
            'id'
          )}/show`}
          component={Link}
        >
          {props.data.get('name')}
        </Button>
      ),
    };
  }
  return sch;
})
;

export default tableSchema;
