/**
 *
 * StatefulSetsPage
 *
 */
import React, { Fragment } from 'react';
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

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
  makeSelectLocation,
} from 'ducks/app/selectors';
import {
  makeSelectStatefulSets,
  makeSelectStatefulSetsList,
} from 'ducks/statefulSets/selectors';
import * as actions from 'ducks/statefulSets/actions';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export const StatefulSetsTable = ({
  location,
  data,
  clusterID,
  namespaceID,
  removeStatefulSet,
}) => {
  const classes = useStyles();
  const pathname = location.get('pathname');
  const mergedSchema = schema
        .map((sch) => {
          if (sch.id === 'actions') {
            return {
              ...sch,
              props: { removeStatefulSet, clusterID, namespaceID },
            };
          }
          if (sch.id === 'name') {
            return {
              ...sch,
              props: { pathname }
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
  location: makeSelectLocation(),
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  data: makeSelectStatefulSetsList(),
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
)(StatefulSetsTable);
