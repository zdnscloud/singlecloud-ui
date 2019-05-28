/**
 *
 * Create Deployment Page
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

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'containers/App/selectors';
import * as cActions from 'ducks/configMaps/actions';
import { makeSelectConfigMaps } from 'ducks/configMaps/selectors';
import {
  makeSelectURL as makeSelectConfigMapURL,
} from 'ducks/configMaps/selectors';
import { makeSelectURL } from 'ducks/deployments/selectors';
import * as actions from 'ducks/deployments/actions';

import messages from './messages';
import DeploymentsHelmet from './helmet';
import styles from './styles';
import DeploymentForm from './DeploymentForm';

export const formName = 'createDeploymentForm';

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

const CreateDeploymentForm = reduxForm({
  form: formName,
  validate,
})(DeploymentForm);

/* eslint-disable react/prefer-stateless-function */
export class CreateDeployment extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { clusterID, namespaceID, configMapURL, loadConfigMaps } = this.props;
    loadConfigMaps({ url: configMapURL, clusterID, namespaceID });
  }

  componentDidUpdate(prevProps) {
    const {
      clusterID: prevClusterID,
      namespaceID: prevNamespaceID,
    } = prevProps;
    const { clusterID, namespaceID, configMapURL, loadConfigMaps } = this.props;
    if (prevClusterID !== clusterID || prevNamespaceID !== namespaceID) {
      loadConfigMaps({ url: configMapURL, clusterID, namespaceID });
    }
  }

  render() {
    const {
      classes,
      createDeployment,
      submitForm,
      url,
      clusterID,
      namespaceID,
      configMaps,
      values,
      theme,
    } = this.props;
    async function doSubmit(formValues) {
      try {
        const data = formValues.toJS();
        await new Promise((resolve, reject) => {
          createDeployment(data, {
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
        <DeploymentsHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.createDeployment} />
              </h4>
            </CardHeader>
            <CardBody style={{ paddingLeft: 0, paddingRight: 0 }}>
              <CreateDeploymentForm
                classes={classes}
                onSubmit={doSubmit}
                configMaps={configMaps}
                initialValues={fromJS({ replicas: 1, containers: [{ name: '' }] })}
                formValues={values}
                theme={theme}
              />
            </CardBody>
            <CardFooter className={classes.cardFooter}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={submitForm}
              >
                <FormattedMessage {...messages.save} />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  configMapURL: makeSelectConfigMapURL(),
  url: makeSelectURL(),
  configMaps: makeSelectConfigMaps(),
  values: getFormValues(formName),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadConfigMaps: cActions.loadConfigMaps,
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
)(CreateDeployment);
