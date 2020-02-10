/**
 *
 * NamespacesPage
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
import { usePush } from 'hooks/router';
import { fromJS } from 'immutable';

import { makeSelectLocation } from 'ducks/app/selectors';
import {
  makeSelectCurrent,
  makeSelectCurrentID as makeSelectCurrentNamespaceID,
} from 'ducks/namespaces/selectors';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import * as actions from 'ducks/namespaces/actions';

import messages from '../messages';
import useStyles from '../styles';
import schema from './memoryTableSchema';

const PodsUseMostMemoryTable = ({
  clusterID,
  location,
  executeNamespaceAction,
  namespace,
  namespaceID,
}) => {
  const classes = useStyles();
  const push = usePush();
  const data = (namespace && namespace.get('podsUseMostMemory')) || fromJS([]);
  const pathname = location.get('pathname');
  const mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'actions') {
        return {
          ...sch,
          props: {
            clusterID,
            classes,
            push,
            executeNamespaceAction,
            namespace,
            namespaceID,
          },
        };
      }
      return sch;
    })
    .map((s) => ({
      ...s,
      label: <FormattedMessage {...messages[`tableTitleM${s.label}`]} />,
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
  location: makeSelectLocation(),
  clusterID: makeSelectCurrentClusterID(),
  namespace: makeSelectCurrent(),
  namespaceID: makeSelectCurrentNamespaceID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PodsUseMostMemoryTable);
