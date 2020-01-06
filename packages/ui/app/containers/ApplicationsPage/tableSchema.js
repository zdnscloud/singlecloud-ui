import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from 'components/CustomIconButtons/IconButton';
import MonitorIcon from 'components/Icons/Monitor';
import TrueIcon from 'components/Icons/True';
import FalseIcon from 'components/Icons/False';

const inflection = require('inflection');
const schema = ['name', 'replicas', 'type', 'exists'];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  // .concat([
  //   {
  //     id: 'actions',
  //     label: 'Actions',
  //     component: ({ data, clusterID, namespaceID }) => {
  //       const workload = ['deployment', 'daemonset', 'statefulset'];
  //       return workload.includes(data.get('type')) ? (
  //         <Fragment>
  //           <IconButton
  //             link
  //             to={`/clusters/${clusterID}/linkerd/namespaces/${namespaceID}/${inflection.pluralize(
  //               data.get('type')
  //             )}/${data.get('name')}`}
  //             component={Link}
  //           >
  //             <MonitorIcon />
  //           </IconButton>
  //         </Fragment>
  //       ) : (
  //         '--'
  //       );
  //     },
  //   },
  // ])
  .map((sch) => {
    if (sch.id === 'name') {
      return {
        ...sch,
        component: ({ data, clusterID, namespaceID }) => (
          <Button
            link
            to={`/clusters/${clusterID}/namespaces/${namespaceID}/${inflection.pluralize(
              data.get('type')
            )}/${data.get('name')}/show`}
            component={Link}
          >
            {data.get('name')}
          </Button>
        ),
      };
    }
    if (sch.id === 'replicas') {
      return {
        ...sch,
        component: ({ data }) => {
          const workload = [
            'deployment',
            'daemonset',
            'statefulset',
            'cronjob',
            'job',
          ];
          return workload.includes(data.get('type')) ? (
            <>
              {data.get('readyReplicas') || 0}/{data.get('replicas')}
              <LinearProgress
                variant="determinate"
                value={
                  ((data.get('readyReplicas') || 0) / data.get('replicas')) *
                  100
                }
              />
            </>
          ) : (
            '--'
          );
        },
      };
    }
    if (sch.id === 'exists') {
      return {
        ...sch,
        component: ({ data, classes }) =>
          data.get('exists') ? (
            <div className={classes.icon}>
              <TrueIcon />
            </div>
          ) : (
            <div className={classes.icon}>
              <FalseIcon />
            </div>
          ),
      };
    }
    return sch;
  });

export default tableSchema;
