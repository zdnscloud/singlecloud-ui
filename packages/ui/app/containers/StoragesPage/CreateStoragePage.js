/**
 *
 * Create Storage Page
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';

import { withStyles } from '@material-ui/core/styles';
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

import { makeSelectClusterID } from 'ducks/app/selectors';
import { makeSelectCurrentCluster } from 'ducks/clusters/selectors';
import * as actions from 'ducks/storages/actions';
import {
  makeSelectURL,
  makeSelectBlockDevicesURL,
  makeSelectBlockDevicesList,
} from 'ducks/storages/selectors';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import styles from './styles';
import StoragesPageHelmet from './helmet';
import StorageForm from './StorageForm';

export const formName = 'createStorageForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name'];
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

const initFormValue = fromJS({ name: '', storageType: '', hosts: [] });

/* eslint-disable react/prefer-stateless-function */
export class CreateStoragePage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  componentWillMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    const { devicesURL: prevDevicesURL } = prevProps;
    const { devicesURL } = this.props;
    if (devicesURL !== prevDevicesURL) {
      this.load();
    }
  }

  load() {
    const { clusterID, loadBlockDevices, devicesURL } = this.props;
    if (devicesURL) {
      loadBlockDevices(devicesURL, clusterID);
    }
  }

  render() {
    const {
      blockDevices,
      classes,
      cluster,
      clusterID,
      createStorage,
      submitForm,
      url,
      values,
    } = this.props;
    async function doSubmit(formValues) {
      try {
        const data = formValues.toJS();
        await new Promise((resolve, reject) => {
          createStorage({ ...data }, { resolve, reject, clusterID, url });
        });
      } catch (error) {
        throw new SubmissionError({ _error: error });
      }
    }

    return (
      <div className={classes.root}>
        <StoragesPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/clusters/${clusterID}/storages`,
                name: <FormattedMessage {...messages.pageTitle} />,
              },
              {
                path: `/clusters/${clusterID}/storages/create`,
                name: <FormattedMessage {...messages.createStorage} />,
              },
            ]}
          />
          <Typography component="div" className="">
            <CreateStorageForm
              classes={classes}
              onSubmit={doSubmit}
              initialValues={initFormValue}
              blockDevices={blockDevices}
              formValues={values || initFormValue}
            />
            <GridContainer className={classes.grid}>
              <GridItem xs={12} sm={12} md={12}>
                <CardFooter className={classes.cardFooter}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                  >
                    <FormattedMessage {...messages.createStorageButton} />
                  </Button>
                </CardFooter>
              </GridItem>
            </GridContainer>
          </Typography>
        </div>
      </div>
    );
  }
}

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
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(CreateStoragePage);