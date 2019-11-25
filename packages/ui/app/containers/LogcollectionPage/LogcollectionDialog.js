/**
 *
 * Create Fluentbitconfig Page
 *
 */
import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import {
  reduxForm,
  getFormValues,
  SubmissionError,
  submit,
} from 'redux-form/immutable';

import { FormattedMessage } from 'react-intl';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Dialog from '@material-ui/core/Dialog';
import CButton from 'components/CustomButtons/Button';
import Button from '@material-ui/core/Button';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from 'components/Icons/Close';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import {
  makeSelectURL,
  makeSelectCurrent,
} from 'ducks/fluentbitconfigs/selectors';
import * as actions from 'ducks/fluentbitconfigs/actions';

import messages from './messages';
import useStyles from './styles';
import CreateFluentbitconfigForm, { formName } from './CreateForm';

export const LogcollectionDialog = ({
  createFluentbitconfig,
  submitForm,
  clusterID,
  namespaceID,
  values,
  loadFluentbitconfigs,
  updateFluentbitconfig,
  cluster,
  url,
  name,
  id,
  kind,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState({});

  async function doSubmit(formValues) {
    try {
      const submitAction = current.regexp
        ? updateFluentbitconfig
        : createFluentbitconfig;
      const data = formValues.toJS();
      console.log('data', data);
      await new Promise((resolve, reject) => {
        submitAction(data, {
          resolve,
          reject,
          url,
          clusterID,
          namespaceID,
        });
      });
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }
  return (
    <Fragment>
      <CButton
        className={classes.logBtn}
        link
        onClick={() => {
          if (url) {
            loadFluentbitconfigs(url, {
              clusterID,
              namespaceID,
              resolve({ response: { data } }) {
                setCurrent(data.filter((l) => l.id === id)[0]);
              },
              reject() {},
            });
          }
          setOpen(true);
        }}
      >
        <FormattedMessage {...messages.logCollectionBtn} />
      </CButton>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        fullWidth
        maxWidth="md"
      >
        <Card className={classes.dialogCard}>
          <CardHeader color="secondary" className={classes.dialogHeader}>
            <h4 className={classes.cardTitleWhite}>
              <FormattedMessage {...messages.logAnalysis} />
            </h4>
            <IconButton onClick={() => setOpen(false)} style={{ padding: 0 }}>
              <CloseIcon style={{ color: '#fff' }} />
            </IconButton>
          </CardHeader>
          <CardBody className={classes.dialogCardBody}>
            <CreateFluentbitconfigForm
              onSubmit={doSubmit}
              formValues={values}
              initialValues={fromJS(current)}
              setOpen={setOpen}
            />
          </CardBody>
          <CardFooter className={classes.dialogCardFooter}>
            <Button variant="contained" color="primary" onClick={submitForm}>
              <FormattedMessage {...messages.save} />
            </Button>
            <Button
              onClick={() => setOpen(false)}
              color="default"
              variant="contained"
            >
              <FormattedMessage {...messages.cancle} />
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(LogcollectionDialog);
