import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import Button from 'components/CustomButtons/Button';
import { FormattedMessage } from 'react-intl';
import Confirm from 'components/Confirm/Confirm';
import IconButton from 'components/CustomIconButtons/IconButton';
import RestartIcon from 'components/Icons/Restart';
// import IconButton from '@material-ui/core/IconButton';
import ShellIcon from 'components/Icons/Shell';
import LogIcon from 'components/Icons/Log';
import Chip from '@material-ui/core/Chip';
import messages from './messages';

const schema = ['name', 'state', 'nodeName', 'containers', 'creationTimestamp'];

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
    if (item.id === 'name') {
      return {
        ...item,
        component: ({data,classes }) => (
          <span className={ data.get('deletionTimestamp') ? classes.strikeout : null}>{ data.get('name')}</span>
        ),
      };
    }
    if (item.id === 'containers') {
      return {
        ...item,
        component({
          value,
          clusterID,
          namespaceID,
          openTerminal,
          classes,
          openPodLog,
          data,
        }) {
          return value != null
            ? value.map((ctn, i) => (
              <Chip
                key={i}
                label={
                  <Fragment>
                    {ctn.get('image')}
                    <IconButton
                      aria-label="View Log"
                      size="small"
                      edge="end"
                      style={{ transform: 'scale(0.7)' }}
                      onClick={(evt) => {
                        openPodLog(
                          {
                            podID: data.get('id'),
                            containerName: ctn.get('name'),
                          },
                          {
                            clusterID,
                            namespaceID,
                          }
                        );
                      }}
                    >
                      <LogIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Terminal"
                      size="small"
                      edge="end"
                      style={{ transform: 'scale(0.7)' }}
                      onClick={(evt) => {
                        openTerminal('pod', {
                          clusterID,
                          namespaceID,
                          podID: data.get('id'),
                          containerName: ctn.get('name'),
                        });
                      }}
                    >
                      <ShellIcon />
                    </IconButton>
                  </Fragment>
                }
              />
            ))
            : null;
        },
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
              <Button action disabled={data.get('deletionTimestamp')}>
                <FormattedMessage {...messages.restartButton} />

              </Button>
            }
          />
        </Fragment>
      ),
    },
  ]);

export default tableSchema;
