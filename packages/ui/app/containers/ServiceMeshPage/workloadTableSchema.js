import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import IconButton from 'components/CustomIconButtons/IconButton';
import DebugIcon from 'components/Icons/Debug'; 
import classNames from 'classnames';

const schema = ['pods','resource', 'meshed', 'RPS','latencyMsP50','latencyMsP95','latencyMsP99','connections','readBytes','writeBytes'];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .concat([
    {
      id: 'actions',
      label: 'Actions',
      component: ({clusterID,namespaceID,data}) => (
        <Fragment>
          <IconButton
            component={Link}
            to={`/clusters/${clusterID}/namespaces/${namespaceID}/workloadGroup/${data.get(
              'id'
            )}`}
          >
            <DebugIcon />
          </IconButton>
        </Fragment>
      ),
    },
  ])
  .map((sch) => {
    if (sch.id === 'pods' ) {
      return {
        ...sch,
        component: ({pathname,data}) => (
          <Button
            link
            component={Link}
            to={`${pathname}/${data.get('id')}`}
          >
            {data.get('pods')}
          </Button>
        ),
      };
    }
    return sch;
  })
  .map((sch) => {
    if (sch.id === 'resource' ) {
      return {
        ...sch,
        component: ({pathname,data}) => (
          <Button
            link
            component={Link}
            to={`${pathname}/${data.get('id')}`}
          >
            {data.get('resource')}
          </Button>
        ),
      };
    }
    return sch;
  })
  tableSchema.splice(3, 0, {
    id: 'successRate',
    label: 'SuccessRate',
    component: ({ data, clusterID, namespaceID, classes }) => {
      const rate = 92 ;
      let activeClasses = "";
      switch (true) {
        case  95 < rate :
        activeClasses = classes.green;
          break;
        case  90 < rate < 95 :
          activeClasses = classes.orange;
            break;
        case  90 < rate :
          activeClasses = classes.red;
            break;  
        default:
            break;
      }
      return (
        <Fragment>
            <span className={classNames(classes.point,activeClasses)}></span>
            <span> {rate} % </span>
        </Fragment>
      )
    }
  })
  ;
export default tableSchema;
