/**
 *
 * Upgrade Dialog
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
import { makeSelectDaemonSets } from 'ducks/daemonSets/selectors';
import * as actions from 'ducks/daemonSets/actions';

import messages from './messages';
import useStyles from './styles';
import Form from './UpgradeForm';

export const formName = 'upgradeDaemonSetForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['reason'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const UpgradeForm = reduxForm({
  form: formName,
  validate,
})(Form);

/* eslint-disable react/prefer-stateless-function */
export const UpgradeDialog = ({
  open,
  close,
  id,
  clusterID,
  namespaceID,
  daemonSets,
  values,
  executeDaemonSetAction,
  readDaemonSet,
  submitForm,
}) => {
  const classes = useStyles();
  const { protocol, hostname, port } = window.location;
  const [initialValues, setInitialValues] = useState(null);

  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();
      const item = daemonSets.get(id);
      const url = item.getIn(['links', 'self']);
      await new Promise((resolve, reject) => {
        executeDaemonSetAction('setImage', data, {
          resolve,
          reject,
          url,
          id,
          clusterID,
          namespaceID,
        });
      });
      readDaemonSet(id, {
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
        const item = daemonSets.get(id);
        const init = {
          reason: '',
          images: item
            .get('containers')
            .map((c) => ({
              name: c.get('name'),
              image: c.get('image'),
            }))
            .toJS(),
        };
        setInitialValues(fromJS(init));
      }}
      onExit={() => {
        setInitialValues(null);
      }}
      PaperProps={{ style: { overflow: 'hidden' } }}
    >
      <Card className={classes.dialogCard}>
        <CardHeader color="secondary" className={classes.dialogHeader}>
          <h4 className={classes.cardTitleWhite}>
            <FormattedMessage {...messages.dialogUpgrade} />
          </h4>
          <IconButton onClick={close} style={{ padding: 0 }}>
            <CloseIcon style={{ color: '#fff' }} />
          </IconButton>
        </CardHeader>
        <CardBody className={classes.dialogCardBody}>
          <Paper elevation={0} className={classes.dialogCardBodyPaper}>
            {initialValues && (
              <UpgradeForm
                onSubmit={doSubmit}
                initialValues={initialValues}
                formValues={values || initialValues}
              />
            )}
          </Paper>
        </CardBody>
        <CardFooter className={classes.dialogCardFooter}>
          <Button onClick={submitForm} color="primary" variant="contained">
            <FormattedMessage {...messages.dialogUpgradeButton} />
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
  daemonSets: makeSelectDaemonSets(),
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

export default compose(withConnect)(UpgradeDialog);
