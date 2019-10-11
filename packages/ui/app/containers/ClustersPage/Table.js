/**
 *
 * ClustersPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ShellIcon from 'components/Icons/Shell';
import SuccessIcon from 'components/Icons/Success';
import FailureIcon from 'components/Icons/Failure';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';

import * as actions from 'ducks/clusters/actions';
import { makeSelectClustersList } from 'ducks/clusters/selectors';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

export const ClustersTable = ({ data, removeCluster, setError }) => {
  const classes = useStyles();
  const mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'actions') {
        return {
          ...sch,
          props: { classes, removeCluster, setError },
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
  data: makeSelectClustersList(),
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

export default compose(withConnect)(ClustersTable);
