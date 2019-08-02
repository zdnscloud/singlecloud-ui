/**
 *
 * Create DaemonSet Page
 *
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import { makeSelectCurrentCluster } from 'ducks/clusters/selectors';
import * as sActions from 'ducks/secrets/actions';
import {
  makeSelectSecrets,
  makeSelectURL as makeSelectSecretURL,
} from 'ducks/secrets/selectors';
import * as cActions from 'ducks/configMaps/actions';
import {
  makeSelectConfigMaps,
  makeSelectURL as makeSelectConfigMapURL,
} from 'ducks/configMaps/selectors';
import { makeSelectCurrentStorageClasses } from 'ducks/storages/selectors';
import * as storagesAction from 'ducks/storages/actions';
import { makeSelectURL } from 'ducks/daemonSets/selectors';
import * as actions from 'ducks/daemonSets/actions';

import messages from './messages';
import DaemonSetsHelmet from './helmet';
import styles from './styles';
import DaemonSetForm from './DaemonSetForm';

export const formName = 'createDaemonSetForm';

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

const CreateDaemonSetForm = reduxForm({
  form: formName,
  validate,
})(DaemonSetForm);

/* eslint-disable react/prefer-stateless-function */
export class CreateDaemonSet extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    const {
      clusterID: prevClusterID,
      namespaceID: prevNamespaceID,
    } = prevProps;
    const { clusterID, namespaceID } = this.props;
    if (prevClusterID !== clusterID || prevNamespaceID !== namespaceID) {
      this.load();
    }
  }

  load() {
    const {
      clusterID,
      namespaceID,
      cluster,
      configMapURL,
      loadConfigMaps,
      secretURL,
      loadSecrets,
      loadStorageClasses,
    } = this.props;
    loadConfigMaps({ url: configMapURL, clusterID, namespaceID });
    loadSecrets({ url: secretURL, clusterID, namespaceID });
    loadStorageClasses(cluster.getIn(['links', 'storageclasses']), clusterID);
  }

  render() {
    const {
      classes,
      createDaemonSet,
      submitForm,
      url,
      clusterID,
      namespaceID,
      configMaps,
      secrets,
      storageClasses,
      values,
      theme,
    } = this.props;
    async function doSubmit(formValues) {
      try {
        const data = formValues.toJS();
        const { containers } = data;
        containers.forEach((item) => {
          if (item && item.args) {
            item.args = item.args.split(' ');
          }
          if (item && item.command) {
            item.command = item.command.split(' ');
          }
        });
        await new Promise((resolve, reject) => {
          createDaemonSet(data, {
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
      <div className={classes.root}>
        <DaemonSetsHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/clusters/${clusterID}/namespaces/${namespaceID}/daemonSets`,
                name: <FormattedMessage {...messages.pageTitle} />,
              },
              {
                path: '#',
                name: <FormattedMessage {...messages.createDaemonSet} />,
              },
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <CreateDaemonSetForm
                classes={classes}
                onSubmit={doSubmit}
                configMaps={configMaps}
                secrets={secrets}
                storageClasses={storageClasses}
                initialValues={fromJS({
                  replicas: 1,
                  containers: [{ name: '' }],
                })}
                formValues={values}
                theme={theme}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={submitForm}
              >
                <FormattedMessage {...messages.save} />
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  cluster: makeSelectCurrentCluster(),
  url: makeSelectURL(),
  configMapURL: makeSelectConfigMapURL(),
  configMaps: makeSelectConfigMaps(),
  secretURL: makeSelectSecretURL(),
  secrets: makeSelectSecrets(),
  storageClasses: makeSelectCurrentStorageClasses(),
  values: getFormValues(formName),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadConfigMaps: cActions.loadConfigMaps,
      loadSecrets: sActions.loadSecrets,
      loadStorageClasses: storagesAction.loadStorageClasses,
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
  withStyles(styles, { withTheme: true })
)(CreateDaemonSet);
