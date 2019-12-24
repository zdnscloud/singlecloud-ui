import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

// https://godoc.org/google.golang.org/grpc/codes#Code
const grpcStatusCodes = {
  0: 'OK',
  1: 'Canceled',
  2: 'Unknown',
  3: 'InvalidArgument',
  4: 'DeadlineExceeded',
  5: 'NotFound',
  6: 'AlreadyExists',
  7: 'PermissionDenied',
  8: 'ResourceExhausted',
  9: 'FailedPrecondition',
  10: 'Aborted',
  11: 'OutOfRange',
  12: 'Unimplemented',
  13: 'Internal',
  14: 'Unavailable',
  15: 'DataLoss',
  16: 'Unauthenticated',
};

const spinnerStyles = (theme) => ({
  progress: {
    margin: theme.spacing(2),
  },
});
const SpinnerBase = () => <CircularProgress size={20} />;
const Spinner = withStyles(spinnerStyles)(SpinnerBase);

const formatTapLatency = (d) => {
  const nanos = d.get('nanos');
  return `${(nanos / 10e6).toFixed(2)}ms`;
};

const schema = [
  'self',
  'proxyDirection',
  'name',
  'method',
  'path',
  'latency',
  'httpStatus',
  'grpcStatus',
];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((sch) => {
    if (sch.id === 'name') {
      return {
        ...sch,
        component: ({ data }) =>
          data.get('proxyDirection') === 'INBOUND'
            ? data.getIn(['sourceMeta', 'labels', 'deployment'])
            : data.getIn(['destinationMeta', 'labels', 'deployment']),
      };
    }
    if (sch.id === 'method') {
      return {
        ...sch,
        component: ({ data }) => data.getIn(['event', 'requestInit', 'method']),
      };
    }
    if (sch.id === 'path') {
      return {
        ...sch,
        component: ({ data }) => data.getIn(['event', 'requestInit', 'path']),
      };
    }
    if (sch.id === 'latency') {
      return {
        ...sch,
        component: ({ data }) => {
          const d = data.getIn(['event', 'responseInit', 'sinceRequestInit']);
          if (!d || d.size === 0) return <Spinner />;
          return formatTapLatency(d);
        },
      };
    }
    if (sch.id === 'httpStatus') {
      return {
        ...sch,
        component: ({ data }) => {
          const d = data.getIn(['event', 'responseInit', 'httpStatus']);
          if (!d) return <Spinner />;
          return d;
        },
      };
    }
    if (sch.id === 'grpcStatus') {
      return {
        ...sch,
        component: ({ data }) => {
          const d = data.getIn(['event', 'responseEnd']);
          if (!d || d.size === 0) return <Spinner />;
          const eos = d.get('eos');
          if (eos == null) return '---';
          return grpcStatusCodes[eos];
        },
      };
    }
    return sch;
  });

export default tableSchema;
