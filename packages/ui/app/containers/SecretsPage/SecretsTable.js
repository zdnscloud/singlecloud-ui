/**
 *
 * SecretsPage Table
 *
 */

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import * as actions from 'ducks/secrets/actions';
import {
  makeSelectURL,
  makeSelectSecrets,
  makeSelectSecretsList,
} from 'ducks/secrets/selectors';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export const SecretsTable = ({
  data,
  secrets,
  clusterID,
  namespaceID,
  removeSecret,
}) => {
  const classes = useStyles();
  const mergedSchema = schema
    .map((s) => ({
      ...s,
      label: <FormattedMessage {...messages[`tableTitle${s.label}`]} />,
    }))
    .map((sch) => {
      if (sch.id === 'actions') {
        return {
          ...sch,
          props: { removeSecret, clusterID, namespaceID },
        };
      }
      if (sch.id === 'name') {
        return {
          ...sch,
          props: { clusterID, namespaceID },
        };
      }
      return sch;
    });

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
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  secrets: makeSelectSecrets(),
  data: makeSelectSecretsList(),
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

export default compose(withConnect)(SecretsTable);
