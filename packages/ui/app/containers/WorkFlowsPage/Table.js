/**
 *
 * WorkFlows Table
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Map, List } from 'immutable';

import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';

import {
  makeSelectLocation,
} from 'ducks/app/selectors';
import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import {
  makeSelectWorkFlowsList,
  makeSelectURL,
} from 'ducks/workFlows/selectors';
import * as actions from 'ducks/workFlows/actions';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';
import RunDialog from './RunDialog';

/* eslint-disable react/prefer-stateless-function */
const WorkFlowsTable = ({
  location,
  data,
  clusterID,
  namespaceID,
  removeWorkFlow,
  loadWorkFlows,
  url,
}) => {
  const classes = useStyles();
  const pathname = location.get('pathname');
  const [dialog, setRunDialog] = useState(null);
  const mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'actions') {
        return {
          ...sch,
          props: {
            removeWorkFlow,
            clusterID,
            namespaceID,
            setRunDialog,
          },
        };
      }
      if (sch.id === 'name') {
        return {
          ...sch,
          props: { pathname },
        };
      }
      return sch;
    })
    .map((s) => ({
      ...s,
      label: <FormattedMessage {...messages[`tableTitle${s.label}`]} />,
    }));

  return (
    <Paper className={classes.tableWrapper}>
      <RunDialog
        open={dialog}
        close={()=>{
          setRunDialog(null);
          loadWorkFlows(url, {
            clusterID,
            namespaceID,
          });
        }}
        id={dialog}
        workFlow={dialog}
      />
      <SimpleTable
        className={classes.table}
        schema={mergedSchema}
        data={data}
      />
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  data: makeSelectWorkFlowsList(),
  url: makeSelectURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
)(WorkFlowsTable);
