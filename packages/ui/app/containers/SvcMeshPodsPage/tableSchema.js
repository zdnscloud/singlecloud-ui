import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import classNames from 'classnames';

const schema = [
  'pods',
  'resource',
  'meshed',
  'RPS',
  'latencyMsP50',
  'latencyMsP95',
  'latencyMsP99',
  'connections',
  'readBytes',
  'writeBytes',
];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((sch) => {
    if (sch.id === 'pods') {
      return {
        ...sch,
        component: ({ pathname, data }) => (
          <Button link component={Link} to={`${pathname}/${data.get('id')}`}>
            {data.get('pods')}
          </Button>
        ),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'resource') {
      return {
        ...sch,
        component: ({ pathname, data }) => (
          <Button link component={Link} to={`${pathname}/${data.get('id')}`}>
            {data.get('resource')}
          </Button>
        ),
      };
    }
    return sch;
  });
tableSchema.splice(3, 0, {
  id: 'successRate',
  label: 'SuccessRate',
  component: ({ data, clusterID, namespaceID, classes }) => {
    const rate = 92;
    let activeClasses = '';
    switch (true) {
      case rate > 95:
        activeClasses = classes.green;
        break;
      case rate > 90 < 95:
        activeClasses = classes.orange;
        break;
      case rate > 90:
        activeClasses = classes.red;
        break;
      default:
        break;
    }
    return (
      <Fragment>
        <span className={classNames(classes.point, activeClasses)}></span>
        <span> {rate} % </span>
      </Fragment>
    );
  },
});
export default tableSchema;
