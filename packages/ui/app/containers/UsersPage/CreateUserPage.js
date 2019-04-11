/**
 *
 * Create User
 *
 */

import React, { Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector, createSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';
import sha1 from 'crypto-js/sha1';
import encHex from 'crypto-js/enc-hex';

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

import * as actions from 'ducks/users/actions';
import { makeSelectClusters, makeSelectClustersAndNamespaces } from 'containers/ClustersPage/selectors';

import messages from './messages';
import ApplicationsHelmet from './helmet';
import styles from './styles';
import UserForm from './UserForm';

export const formName = 'createUserForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name', 'password'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const CreateUserForm = reduxForm({
  form: formName,
  validate,
})(UserForm);

/* eslint-disable react/prefer-stateless-function */
export class CreateUserPage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const {
      classes,
      clusters,
      createUser,
      submitForm,
    } = this.props;
    async function doSubmit(formValues) {
      try {
        const data = formValues.toJS();
        const password = sha1(formValues.get('password')).toString(encHex);
        const name = formValues.get('name');
        await new Promise((resolve, reject) => {
          createUser({ ...data, password }, { resolve, reject });
        });
      } catch (error) {
        throw new SubmissionError({ _error: error });
      }
    }

    return (
      <div className={classes.root}>
        <ApplicationsHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Card>
            <CardHeader color="customBlue">
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.createUser} />
              </h4>
            </CardHeader>
            <CardBody>
              <CreateUserForm
                classes={classes}
                clusters={clusters}
                onSubmit={doSubmit}
              />
            </CardBody>
            <CardFooter className={classes.cardFooter}>
              <Button
                variant="contained"
                color="primary"
                size="lg"
                onClick={submitForm}
              >
                Create
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusters: makeSelectClustersAndNamespaces(),
  values: createSelector(
    getFormValues(formName),
    (v) => (v)
  ),
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
)(CreateUserPage);
