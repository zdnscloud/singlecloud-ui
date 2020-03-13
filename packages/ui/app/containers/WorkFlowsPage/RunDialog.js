/**
 *
 * Run Dialog
 *
 */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import {
  reduxForm,
  getFormValues,
  SubmissionError,
  submit,
} from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from 'components/Icons/Close';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import * as actions from 'ducks/workFlowTasks/actions';

import messages from './messages';
import useStyles from './styles';
import Form from './RunForm';

export const formName = 'runForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = [];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const RunForm = reduxForm({
  form: formName,
  validate,
})(Form);

/* eslint-disable react/prefer-stateless-function */
export const RunDialog = ({
  open,
  close,
  id,
  clusterID,
  namespaceID,
  workFlow,
  values,
  readWorkFlowTask,
  createWorkFlowTask,
  submitForm,
}) => {
  const classes = useStyles();

  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();
      const workFlowID = workFlow.get(id);
      const url = workFlow.getIn(['links', 'workflowtasks']);
      await new Promise((resolve, reject) => {
        createWorkFlowTask( data, {
          resolve,
          reject,
          url,
          clusterID,
          namespaceID,
          workFlowID,
        });
      });
      readWorkFlowTask(id, {
        url,
        clusterID,
        namespaceID,
      });
      close();
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      open={open}
      PaperProps={{ style: { overflow: 'hidden' } }}
    >
      <Card className={classes.dialogCard}>
        <CardHeader color="light" className={classes.dialogHeader}>
          <h4 className={classes.cardTitleWhite}>
            <FormattedMessage {...messages.dialogTitleRun} />
          </h4>
          <IconButton onClick={close} style={{ padding: 0 }}>
            <CloseIcon />
          </IconButton>
        </CardHeader>
        <CardBody className={classes.dialogCardBody}>
          <RunForm
            onSubmit={doSubmit}
            formValues={values}
          />
        </CardBody>
        <DialogActions>
          <Button onClick={submitForm} color="primary" variant="contained">
            <FormattedMessage {...messages.save} />
          </Button>
          <Button onClick={close} className={classes.cancleBtn} variant="contained">
            <FormattedMessage {...messages.cancle} />
          </Button>
        </DialogActions>
      </Card>
    </Dialog>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  values: getFormValues(formName),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RunDialog);
