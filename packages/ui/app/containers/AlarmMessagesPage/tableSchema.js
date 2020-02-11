import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { FormattedMessage } from 'react-intl';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import Info from 'components/Typography/Info';
import Danger from 'components/Typography/Danger';

import messages from './messages';

/**
  payload: {
    "type":"UnackAlarm",
    "payload": {
      "id":"1",
      "creationTimestamp":null,
      "deletionTimestamp":null,
      "time":"2019-12-30T09:40:41Z",
      "cluster":"local",
      "type":"Event",
      "kind":"Pod",
      "name":"cluster-agent-7699c76df-gf6k8",
      "reason":"Failed",
      "message":"Error: ImagePullBackOff",
      "acknowledged":false
    }
  }
*/
const schema = ['status', 'time', 'cluster', 'namespace', 'object', 'type', 'detail'];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((item) => {
    if (item.id === 'status') {
      return {
        ...item,
        component: ({ data, updateAlarm }) =>
          data.get('acknowledged') ? (
            <Info inverse style={{ textAlign: 'center' }}>
              <FormattedMessage {...messages.read} />
            </Info>
          ) : (
            <Danger
              inverse
              style={{ cursor: 'pointer', textAlign: 'center' }}
              onClick={(evt) => {
                updateAlarm(data.set('acknowledged', true).toJS(), {
                  url: data.getIn(['links', 'update']),
                });
              }}
            >
              <FormattedMessage {...messages.unread} />
            </Danger>
          ),
      };
    }
    if (item.id === 'time') {
      return {
        ...item,
        component: TimeCell,
      };
    }
    if (item.id === 'object') {
      return {
        ...item,
        component: ({ data }) => `${data.get('kind')}${data.get('name') ? '/' : ''}${data.get('name')}`,
      };
    }
    if (item.id === 'type') {
      return {
        ...item,
        component: ({ data }) => data.get('type') === 'event' ?
          <FormattedMessage {...messages.tableTypeEvent} /> : <FormattedMessage {...messages.tableTypeAlarm} />,
      };
    }
    if (item.id === 'detail') {
      return {
        ...item,
        component: ({ data }) => data.get('message'),
      };
    }
    return item;
  });

export default tableSchema;
