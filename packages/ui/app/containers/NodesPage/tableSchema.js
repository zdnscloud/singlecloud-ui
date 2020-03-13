/* eslint-disable indent */
import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import Chip from '@material-ui/core/Chip';
import TimeCell from 'components/Cells/TimeCell';
import { FormattedMessage } from 'react-intl';
import Confirm from 'components/Confirm/Confirm';
import messages from './messages';

const schema = [
  'name',
  'status',
  'address',
  'roles',
  // 'cpu',
  // 'memory',
  // 'operatingSystem',
  // 'operatingSystemImage',
  // 'pod',
  // 'dockerVersion',
  'operatingSystemImage',
  'creationTimestamp',
];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((item) => {
    if (item.id === 'name') {
      return {
        ...item,
        component: ({data, pathname,classes}) =>
        data.get('deletionTimestamp') ? (
          <span className={ data.get('deletionTimestamp') ? classes.strikeout : null}>{ data.get('name')}</span>
        ) : (
          <Button
            link
            to={`${pathname}/${data.get('id')}/show`}
            component={Link}
          >
            {data.get('name')}
          </Button>
        ),
      };
    }
    if (item.id === 'roles') {
      return {
        ...item,
        component({ value }) {
          return value != null
            ? value
                .map((val, key) => <Chip key={key} label={`${val}`} />)
                .toList()
            : null;
        },
      };
    }
    if (item.id === 'creationTimestamp') {
      return {
        ...item,
        component: TimeCell,
      };
    }
    return item;
  })
  .concat([
    {
      id: 'actions',
      label: 'Actions',
      component: ({ data, classes, executeNodeAction, setError }) => (
        <Fragment>
          <Confirm
            handleConfirm={() =>
              executeNodeAction('cordon', null, {
                url: data.getIn(['links', 'self']),
                resolve() {},
                reject(e) {
                  setError(e);
                },
              })
            }
            dialogContentText={messages.cordonPromptText}
            component={
              <Button className={classes.tableBtn} action disabled={data.get('deletionTimestamp')}>
                <FormattedMessage {...messages.tableCordonBtn}   />
              </Button>
            }
          />

          <Confirm
            handleConfirm={() =>
              executeNodeAction('drain', null, {
                url: data.getIn(['links', 'self']),
                resolve() {},
                reject(e) {
                  setError(e);
                },
              })
            }
            dialogContentText={messages.drainPromptText}
            component={
              <Button className={classes.tableBtn} action  disabled={data.get('deletionTimestamp')}>
                <FormattedMessage {...messages.tableDrainBtn} />
              </Button>
            }
          />
          <Confirm
            handleConfirm={() =>
              executeNodeAction('uncordon', null, {
                url: data.getIn(['links', 'self']),
                resolve() {},
                reject(e) {
                  setError(e);
                },
              })
            }
            dialogContentText={messages.uncordonPromptText}
            component={
              <Button className={classes.tableBtn} action  disabled={data.get('deletionTimestamp')}>
                <FormattedMessage {...messages.tableUncordonBtn}  />
              </Button>
            }
          />
        </Fragment>
      ),
    },
  ]);

export default tableSchema;
