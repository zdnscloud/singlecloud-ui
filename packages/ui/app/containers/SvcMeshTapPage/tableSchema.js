import React, { Fragment, useState } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import TimeCell from 'components/Cells/TimeCell';
import Button from 'components/CustomButtons/Button';
import OpenInNewIcon from 'components/Icons/OpenInNew';
import ExpandMoreIcon from 'components/Icons/ExpandMore';
import ArrowAltRightIcon from 'components/Icons/ArrowAltRight';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import messages from './messages';
import Popover from './Popover';

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
  return `${(nanos / 1e6).toFixed(2)}ms`;
};

const getResType = (d) => {
  const tapResourceTypes = ['deployment', 'daemonset', 'statefulset'];
  for (let i = 0; i < tapResourceTypes.length; i += 1) {
    const t = tapResourceTypes[i];
    if (d[t]) return t;
  }
  return '---';
};

const renderResourceDirection = (data) => {
  const s = data
    .getIn(['sourceMeta', 'labels'])
    .merge(data.get('source'))
    .toJS();
  const d = data
    .getIn(['destinationMeta', 'labels'])
    .merge(data.get('destination'))
    .toJS();
  const st = getResType(s);
  const dt = getResType(d);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell component="th">
            <FormattedMessage {...messages.tableDirectionSource} />
          </TableCell>
          <TableCell component="th"></TableCell>
          <TableCell component="th">
            <FormattedMessage {...messages.tableDirectionTarget} />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{`${st}/${s[st]}`}</TableCell>
          <TableCell>
            <ArrowAltRightIcon />
          </TableCell>
          <TableCell>{`${dt}/${d[dt]}`}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{`pod/${s.pod}`}</TableCell>
          <TableCell>
            <ArrowAltRightIcon />
          </TableCell>
          <TableCell>{`pod/${d.pod}`}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{`${s.ip}:${s.port}`}</TableCell>
          <TableCell>
            <ArrowAltRightIcon />
          </TableCell>
          <TableCell>{`${d.ip}:${d.port}`}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
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
    if (sch.id === 'self') {
      return {
        ...sch,
        component: ({ data, setOpen }) => (
          <IconButton onClick={() => setOpen(data)}>
            <ExpandMoreIcon />
          </IconButton>
        ),
      };
    }
    if (sch.id === 'proxyDirection') {
      return {
        ...sch,
        component: ({ data }) => (
          <Tooltip title={data.get('proxyDirection')} placement="right">
            <span>
              {data.get('proxyDirection') === 'INBOUND' ? 'FROM' : 'TO'}
            </span>
          </Tooltip>
        ),
      };
    }
    if (sch.id === 'name') {
      return {
        ...sch,
        component: ({ data }) => {
          const cur =
            data.get('proxyDirection') === 'INBOUND'
              ? data.getIn(['sourceMeta', 'labels'])
              : data.getIn(['destinationMeta', 'labels']);

          const linkFn = (e) => {
            e.preventDefault();
          };

          const baseContent = (
            <IconButton onClick={linkFn}>
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          );
          const link = cur.get('link').replace('/apis/zcloud.cn/v1', '');

          return (
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <Button link component={Link} to={`${link}/show`}>
                  {cur.get('deployment') || cur.get('statefulset') || cur.get('daemonset')}
                </Button>
              </Grid>
              <Grid item>
                <Popover
                  popoverContent={renderResourceDirection(data)}
                  baseContent={baseContent}
                />
              </Grid>
            </Grid>
          );
        },
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
