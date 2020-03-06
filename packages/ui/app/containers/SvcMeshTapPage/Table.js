/**
 *
 * Svc Mesh Tap Table
 *
 */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import throttleRender from '@gsmlg/com/throttleRender';

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeSelectLocation } from 'ducks/app/selectors';
import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectSvcMeshTapsList } from 'ducks/svcMeshTap/selectors';
import * as actions from 'ducks/svcMeshTap/actions';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';
import RequestDetail from './RequestDetail';

const TapTable = ({ data, clusterID, namespaceID }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'self') {
        return {
          ...sch,
          props: { setOpen },
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
      <Dialog
        maxWidth="md"
        fullWidth
        open={Boolean(open)}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Request Details</DialogTitle>
        <DialogContent>
          <RequestDetail data={open} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  data: makeSelectSvcMeshTapsList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(throttleRender(TapTable, 400));
