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
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import * as actions from 'ducks/storages/actions';
import { makeSelectURL } from 'ducks/storages/selectors';
import * as bdActions from 'ducks/blockDevices/actions';
import {
  makeSelectURL as makeSelectBlockDevicesURL,
  makeSelectBlockDevicesList,
} from 'ducks/blockDevices/selectors';
import * as nodesActions from 'ducks/nodes/actions';
import {
  makeSelectURL as makeSelectNodesURL,
  makeSelectNodesList,
} from 'ducks/nodes/selectors';

import { usePush, useLocation } from 'hooks/router';

import messages from './messages';
import useStyles from './styles';
import StorageForm from './Form';

export const formName = 'createStorageForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name', 'type'];
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

const initFormValue = fromJS({ name: '', type: '', parameter: { hosts: [], initiators: [],targets:[''] } });

export const CreateStoragePage = ({
  loadBlockDevices,
  devicesURL,
  blockDevices,
  loadNodes,
  nodesURL,
  nodes,
  cluster,
  clusterID,
  createStorage,
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
    if (nodesURL) {
      loadNodes(nodesURL, { clusterID });
    }
  }, [clusterID, devicesURL, loadBlockDevices, loadNodes, nodesURL]);

  async function doSubmit(formValues) {
    try {
      const data = formValues.set(formValues.get('type'), formValues.get('parameter')).remove('parameter').toJS();
      await new Promise((resolve, reject) => {
        createStorage({ ...data }, { resolve, reject, clusterID, url });
      });
      push(`/clusters/${clusterID}/storages`);
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
              path: `/clusters/${clusterID}/storages`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.createStorage} />,
            },
          ]}
        />
        <Typography component="div">
          <CreateStorageForm
            classes={classes}
            onSubmit={doSubmit}
            initialValues={initFormValue}
            blockDevices={blockDevices.filter((b) => !b.get('usedby'))}
            nodes={nodes}
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
  nodesURL: makeSelectNodesURL(),
  nodes: makeSelectNodesList(),
  values: getFormValues(formName),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      ...bdActions,
      ...nodesActions,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CreateStoragePage);
