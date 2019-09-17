/**
 *
 * Edit Storage Page
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
import {
  makeSelectURL,
  makeSelectCurrent,
  makeSelectCurrentID,
} from 'ducks/storageClusters/selectors';
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

export const formName = 'editStorageForm';

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

const EditStorageForm = reduxForm({
  form: formName,
  validate,
})(StorageForm);

export const EditStoragePage = ({
  loadBlockDevices,
  devicesURL,
  blockDevices,
  clusterID,
  id,
  readStorageCluster,
  updateStorageCluster,
  submitForm,
  storage,
  url,
  values,
}) => {
  const classes = useStyles();
  const push = usePush();
  const location = useLocation();
  useEffect(() => {
    readStorageCluster(id, { clusterID, url: `${url}/${id}` });
    if (devicesURL) {
      loadBlockDevices(devicesURL, { clusterID });
    }
  }, [devicesURL, url, id, clusterID, readStorageCluster, loadBlockDevices]);

  const itemUrl = storage.getIn(['links', 'update']);
  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();
      await new Promise((resolve, reject) => {
        updateStorageCluster(
          { ...data },
          { resolve, reject, clusterID, url: itemUrl }
        );
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
              name: <FormattedMessage {...messages.editStorage} />,
            },
          ]}
        />
        <Typography component="div">
          {storage.size > 0 ? (
            <EditStorageForm
              classes={classes}
              onSubmit={doSubmit}
              initialValues={storage}
              blockDevices={blockDevices.filter(
                (b) =>
                  !b.get('usedby') ||
                  b.get('usedby') === storage.get('storageType')
              )}
              formValues={values || storage}
              edit
            />
          ) : null}
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <CardFooter className={classes.cardFooter}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitForm}
                >
                  <FormattedMessage {...messages.editStorageButton} />
                </Button>
              </CardFooter>
            </GridItem>
          </GridContainer>
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  id: makeSelectCurrentID(),
  url: makeSelectURL(),
  devicesURL: makeSelectBlockDevicesURL(),
  blockDevices: makeSelectBlockDevicesList(),
  values: getFormValues(formName),
  storage: makeSelectCurrent(),
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(EditStoragePage);
