/**
 *
 * Create StatefulSet Page
 *
 */

import React, { Fragment } from 'react';
import { findDOMNode } from 'react-dom';
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
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
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
import { makeSelectURL } from 'ducks/statefulSets/selectors';
import * as actions from 'ducks/statefulSets/actions';

import messages from './messages';
import StatefulSetsHelmet from './helmet';
import styles from './styles';
import StatefulSetForm from './StatefulSetForm';

export const formName = 'createStatefulSetForm';

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

const CreateStatefulSetForm = reduxForm({
  form: formName,
  validate,
})(StatefulSetForm);

/* eslint-disable react/prefer-stateless-function */
export class CreateStatefulSet extends React.PureComponent {
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
      createStatefulSet,
      submitForm,
      url,
      clusterID,
      namespaceID,
      configMaps,
      secrets,
      storageClasses,
      values,
    } = this.props;
    async function doSubmit(formValues) {
      try {
        const data = formValues.toJS();
        const { containers, persistentVolumes, advancedOptions } = data;
        const exposedPortsArrr = [];
        containers.forEach((item) => {
          if (item && item.args) {
            item.args = item.args.split(' ');
          }
          if (item && item.command) {
            item.command = item.command.split(' ');
          }
          exposedPortsArrr.push(...item.exposedPorts);
        });
        const { exposedServices } = advancedOptions;
        const esArr = [];
        if (exposedPortsArrr.length > 0) {
          exposedPortsArrr.forEach((i) => {
            exposedServices.forEach((j) => {
              if (i.name === j.name) {
                esArr.push(j);
              }
            });
          });
        }
        advancedOptions.exposedServices = esArr;
        persistentVolumes.forEach((item) => {
          if (item && item.size) {
            item.size = `${item.size}Gi`;
          }
        });
        await new Promise((resolve, reject) => {
          createStatefulSet(data, {
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
        <StatefulSetsHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/clusters/${clusterID}/namespaces/${namespaceID}/statefulSets`,
                name: <FormattedMessage {...messages.pageTitle} />,
              },
              {
                name: <FormattedMessage {...messages.createStatefulSet} />,
              },
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <CreateStatefulSetForm
                classes={classes}
                onSubmit={doSubmit}
                configMaps={configMaps}
                secrets={secrets}
                storageClasses={storageClasses}
                initialValues={fromJS({
                  replicas: 1,
                  containers: [{ name: '', exposedPorts: [] }],
                  persistentVolumes: [],
                  advancedOptions: {
                    exposedServices: [],
                  },
                })}
                formValues={values}
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
  withStyles(styles)
)(CreateStatefulSet);
