/**
 *
 * StorageClusters Table
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';

import { makeSelectLocation } from 'ducks/app/selectors';
import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import * as actions from 'ducks/storageClusters/actions';
import {
  makeSelectStorageClusters,
  makeSelectStorageClustersList,
} from 'ducks/storageClusters/selectors';

import { usePush, useLocation } from 'hooks/router';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

export const StoragesTable = ({
  clusterID,
  data,
  removeStorageCluster,
  setError,
}) => {
  const classes = useStyles();
  const location = useLocation();
  const { pathname } = location;
  const mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'actions') {
        return {
          ...sch,
          props: { removeStorageCluster, clusterID, pathname, setError },
        };
      }
      if (sch.id === 'storageType') {
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
      <SimpleTable
        className={classes.table}
        schema={mergedSchema}
        data={data}
      />
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  data: makeSelectStorageClustersList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(StoragesTable);
