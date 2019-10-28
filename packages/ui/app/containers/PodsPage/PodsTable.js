/**
 *
 * Pods Table
 *
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ShellIcon from 'components/Icons/Shell';
import LogIcon from 'components/Icons/Log';
import Chip from '@material-ui/core/Chip';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import * as appActions from 'ducks/app/actions';
import {
  makeSelectPodsList,
  makeSelectSTSPodsList,
  makeSelectDSPodsList,
  makeSelectCJPodsList,
  makeSelectJOBPodsList,
} from 'ducks/pods/selectors';
import * as actions from 'ducks/pods/actions';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';
import LogViewDialog from './LogViewDialog';

/* eslint-disable react/prefer-stateless-function */
const PodsTable = ({
  clusterID,
  namespaceID,
  parentType,
  deployPodList,
  stsPodList,
  dsPodList,
  cjPodList,
  jobPodList,
  removePod,
  openPodLog,
  openTerminal,
}) => {
  const classes = useStyles();
  const mergedSchema = schema
    .map((item) => {
      if (item.id === 'actions') {
        return {
          ...item,
          props: {
            removePod,
          },
        };
      }
      if (item.id === 'containers') {
        return {
          ...item,
          component(props) {
            return props.data.get('containers').map((ctn, i) => (
              <Chip
                key={i}
                variant="outlined"
                label={
                  <Fragment>
                    {`${ctn.get('image')}    `}
                    <IconButton
                      aria-label="View Log"
                      className={classes.button}
                      size="small"
                      edge="end"
                      style={{ transform: 'scale(0.7)' }}
                      onClick={(evt) => {
                        openPodLog(
                          {
                            podID: props.data.get('id'),
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
                      className={classes.button}
                      size="small"
                      edge="end"
                      style={{ transform: 'scale(0.7)' }}
                      onClick={(evt) => {
                        openTerminal('pod', {
                          clusterID,
                          namespaceID,
                          podID: props.data.get('id'),
                          containerName: ctn.get('name'),
                        });
                      }}
                    >
                      <ShellIcon />
                    </IconButton>
                  </Fragment>
                }
              />
            ));
          },
        };
      }
      return item;
    })
    .map((s) => ({
      ...s,
      label: <FormattedMessage {...messages[`tableTitle${s.label}`]} />,
    }));
  let data = [];
  switch (parentType) {
    case 'sts':
      data = stsPodList;
      break;
    case 'ds':
      data = dsPodList;
      break;
    case 'cj':
      data = cjPodList;
      break;
    case 'job':
      data = jobPodList;
      break;
    default:
      data = deployPodList;
  }
  return (
    <Paper className={classes.tableWrapper}>
      <LogViewDialog />
      <SimpleTable
        className={classes.table}
        schema={mergedSchema}
        data={data}
      />
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  deployPodList: makeSelectPodsList(),
  stsPodList: makeSelectSTSPodsList(),
  dsPodList: makeSelectDSPodsList(),
  cjPodList: makeSelectCJPodsList(),
  jobPodList: makeSelectJOBPodsList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...appActions,
      ...actions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(PodsTable);
