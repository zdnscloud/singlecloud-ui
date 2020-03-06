/**
 *
 * Create Storage Page
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';

import Helmet from 'components/Helmet/Helmet';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'components/Icons/Add';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import * as actions from 'ducks/storageClusters/actions';
import { makeSelectURL } from 'ducks/storageClusters/selectors';
import * as bdActions from 'ducks/blockDevices/actions';
import {
  makeSelectURL as makeSelectBlockDevicesURL,
  makeSelectBlockDevicesList,
} from 'ducks/blockDevices/selectors';

import { usePush, useLocation } from 'hooks/router';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import useStyles from './styles';
import StorageForm from './Form';

export const formName = 'createStorageForm';

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

const CreateStorageForm = reduxForm({
  form: formName,
  validate,
})(StorageForm);

const initFormValue = fromJS({ storageType: '', hosts: [] });

export const CreateStoragePage = ({
  loadBlockDevices,
  devicesURL,
  blockDevices,
  cluster,
  clusterID,
  createStorageCluster,
  submitForm,
  url,
  values,
}) => {
  const classes = useStyles();
  const push = usePush();
  const location = useLocation();
  useEffect(() => {
    if (devicesURL) {
      loadBlockDevices(devicesURL, { clusterID });
    }
  }, [clusterID, devicesURL, loadBlockDevices]);

  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();
      await new Promise((resolve, reject) => {
        createStorageCluster({ ...data }, { resolve, reject, clusterID, url });
      });
      push(`/clusters/${clusterID}/storageClusters`);
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/storageClusters`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.createStorage} />,
            },
          ]}
        />
        <Typography component="div" className="">
          <CreateStorageForm
            classes={classes}
            onSubmit={doSubmit}
            initialValues={initFormValue}
            blockDevices={blockDevices.filter((b) => !b.get('usedby'))}
            formValues={values || initFormValue}
          />
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.buttonGroup}>
              <Button
                variant="contained"
                color="primary"
                onClick={submitForm}
              >
                <FormattedMessage {...messages.createStorageButton} />
              </Button>
            </div>
          </GridItem>
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  url: makeSelectURL(),
  devicesURL: makeSelectBlockDevicesURL(),
  blockDevices: makeSelectBlockDevicesList(),
  values: getFormValues(formName),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      ...bdActions,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CreateStoragePage);
