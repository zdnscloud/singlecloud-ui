import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import IconButton from 'components/CustomIconButtons/IconButton';
import classNames from 'classnames';

const schema = ['name','type', 'meshed', 'successRate', 'RPS','latencyMsP50','latencyMsP95','latencyMsP99'];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((sch) => {
    if (sch.id === 'name') {
      return {
        ...sch,
        component: ({pathname,data}) => (
          <Button
            link
            component={Link}
            to={`${pathname}/${data.get('id')}`}
          >
            {data.get('name')}
          </Button>
        ),
      };
    }
    return sch;
  })
  // tableSchema.splice(1, 0, {
  //   id: 'type',
  //   label: 'Type',
  //   component: ({ data, clusterID, namespaceID }) => (
  //     <span></span>
  //   ),
  // })
  ;
export default tableSchema;
