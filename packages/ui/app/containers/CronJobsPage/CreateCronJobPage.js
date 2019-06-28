/**
 *
 * Create CronJob Page
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
import * as cActions from 'ducks/configMaps/actions';
import { makeSelectConfigMaps } from 'ducks/configMaps/selectors';
import {
  makeSelectURL as makeSelectConfigMapURL,
} from 'ducks/configMaps/selectors';
import { makeSelectURL } from 'ducks/cronJobs/selectors';
import * as actions from 'ducks/cronJobs/actions';

import messages from './messages';
import CronJobsHelmet from './helmet';
import styles from './styles';
import CronJobForm from './CronJobForm';

export const formName = 'createCronJobForm';

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

const CreateCronJobForm = reduxForm({
  form: formName,
  validate,
})(CronJobForm);

/* eslint-disable react/prefer-stateless-function */
export class CreateCronJob extends React.PureComponent {
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
      createCronJob,
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
          createCronJob(data, {
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
        <CronJobsHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs 
              data={[
                {
                  path: '/clusters/' + clusterID + '/namespaces/' + namespaceID +'/cronJobs',
                  name: <FormattedMessage {...messages.pageTitle}/>
                },
                {
                  path: '#',
                  name: <FormattedMessage {...messages.createCronJob}/>
                }
              ]}
            />
            <GridContainer className={classes.grid}>
               <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>
                      <FormattedMessage {...messages.createCronJob} />
                    </h4>
                  </CardHeader>
                  <CardBody style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <CreateCronJobForm
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
)(CreateCronJob);
