/**
 *
 * StatefulSetsPage
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';

import { makeSelectLocation } from 'ducks/app/selectors';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import {
  makeSelectStatefulSets,
  makeSelectStatefulSetsList,
} from 'ducks/statefulSets/selectors';
import * as actions from 'ducks/statefulSets/actions';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';
import UpgradeDialog from './UpgradeDialog';
import RollbackDialog from './RollbackDialog';

/* eslint-disable react/prefer-stateless-function */
export const StatefulSetsTable = ({
  location,
  data,
  clusterID,
  namespaceID,
  removeStatefulSet,
  executeStatefulSetAction,
}) => {
  const classes = useStyles();
  const pathname = location.get('pathname');
  const [dialog, setDialog] = useState([null, null]);
  const closeDialog = () => setDialog([null, null]);
  const setUpgrade = (id) => setDialog(['upgrade', id]);
  const setRollback = (id) => setDialog(['rollback', id]);
  const mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'actions') {
        return {
          ...sch,
          props: {
            executeStatefulSetAction,
            removeStatefulSet,
            setUpgrade,
            setRollback,
            clusterID,
            namespaceID,
          },
        };
      }
      if (sch.id === 'name') {
        return {
          ...sch,
          props: { pathname,classes },
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
      <UpgradeDialog
        open={dialog[0] === 'upgrade'}
        close={closeDialog}
        id={dialog[1]}
      />
      <RollbackDialog
        open={dialog[0] === 'rollback'}
        close={closeDialog}
        id={dialog[1]}
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
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  data: makeSelectStatefulSetsList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(StatefulSetsTable);
