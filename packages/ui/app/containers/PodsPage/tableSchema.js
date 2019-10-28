import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import Button from 'components/CustomButtons/Button';
import { FormattedMessage } from 'react-intl';
import Confirm from 'components/Confirm/Confirm';
import IconButton from 'components/CustomIconButtons/IconButton';
import RestartIcon from 'components/Icons/Restart';
import messages from './messages';

const schema = ['state', 'name', 'nodeName', 'containers', 'creationTimestamp'];

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
    return item;
  })
  .concat([
    {
      id: 'actions',
      label: 'Actions',
      component: ({ removePod, data }) => (
        <Fragment>
          <Confirm
            handleConfirm={() =>
              removePod(data.get('id'), {
                url: data.getIn(['links', 'remove']),
              })
            }
            dialogContentText={messages.restartDialogContentText}
            component={
              <IconButton>
                <RestartIcon />
              </IconButton>
            }
          />
        </Fragment>
      ),
    },
  ]);

export default tableSchema;
