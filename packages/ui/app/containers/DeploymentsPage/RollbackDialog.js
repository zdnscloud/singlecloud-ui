/**
 *
 * Rollback Dialog
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
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from 'components/Icons/Close';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectDeployments } from 'ducks/deployments/selectors';
import * as actions from 'ducks/deployments/actions';

import messages from './messages';
import useStyles from './styles';
import Form from './RollbackForm';

export const formName = 'upgradeDeploymentForm';

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

const RollbackForm = reduxForm({
  form: formName,
  validate,
})(Form);

/* eslint-disable react/prefer-stateless-function */
export const RollbackDialog = ({
  open,
  close,
  id,
  clusterID,
  namespaceID,
  deployments,
  values,
  readDeployment,
  executeDeploymentAction,
  submitForm,
}) => {
  const classes = useStyles();
  const { protocol, hostname, port } = window.location;
  const [initialValues, setInitialValues] = useState(null);
  const [history, setHistory] = useState([]);

  async function doSubmit(formValues) {
    try {
      const current = history.find(
        (h) => h.version === formValues.get('version')
      );
      const data = {
        version: formValues.get('version'),
        reason: current.changeReason,
      };
      const item = deployments.get(id);
      const url = item.getIn(['links', 'self']);
      await new Promise((resolve, reject) => {
        executeDeploymentAction('rollback', data, {
          resolve,
          reject,
          url,
          id,
          clusterID,
          namespaceID,
        });
      });
      readDeployment(id, {
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
      /* maxWidth="md" */
      open={open}
      onEnter={() => {
        const item = deployments.get(id);

        const resolve = (resp) => {
          const data = getByKey(resp, ['response', 'history'], []);
          setHistory(data);
          const init = {
            version: data.length > 0 ? data[data.length - 1].version : 0,
          };
          setInitialValues(fromJS(init));
        };
        const reject = (error) => {
          // console.log(error);
        };
        executeDeploymentAction(
          'history',
          {},
          {
            resolve,
            reject,
            url: item.getIn(['links', 'self']),
            id,
            clusterID,
            namespaceID,
          }
        );
      }}
      onExit={() => {
        setInitialValues(null);
      }}
      PaperProps={{ style: { overflow: 'hidden' } }}
    >
      <Card className={classes.dialogCard}>
        <CardHeader color="light" className={classes.dialogHeader}>
          <h4 className={classes.cardTitleWhite}>
            <FormattedMessage {...messages.dialogRollback} />
          </h4>
          <IconButton onClick={close} style={{ padding: 0 }}>
            <CloseIcon />
          </IconButton>
        </CardHeader>
        <CardBody className={classes.dialogCardBody}>
          <Paper elevation={0} className={classes.dialogCardBodyPaper}>
            {initialValues && (
              <RollbackForm
                onSubmit={doSubmit}
                initialValues={initialValues}
                formValues={values || initialValues}
                history={history}
              />
            )}
          </Paper>
        </CardBody>
        <CardFooter className={classes.dialogCardFooter}>
          <Button onClick={submitForm} color="primary" variant="contained">
            <FormattedMessage {...messages.dialogRollbackButton} />
          </Button>
          <Button onClick={close} color="default" variant="contained">
            <FormattedMessage {...messages.dialogCancelButton} />
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  deployments: makeSelectDeployments(),
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

export default compose(withConnect)(RollbackDialog);
