/**
 *
 * Edit User
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
import { makeSelectEditingUser } from 'ducks/users/selectors';
import { makeSelectLocation } from 'containers/App/selectors';
import { makeSelectClustersAndNamespaces } from 'containers/ClustersPage/selectors';

import messages from './messages';
import UsersHelmet from './helmet';
import styles from './styles';
import UserForm from './UserForm';

export const formName = 'editUserForm';

const validate = (values) => {
  const errors = {};
  return errors;
};

const EditUserForm = reduxForm({
  form: formName,
  validate,
})(UserForm);

/* eslint-disable react/prefer-stateless-function */
export class EditUserPage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.loadUser();
  }

  render() {
    const {
      classes,
      clusters,
      updateUser,
      submitForm,
      user,
    } = this.props;
    async function doSubmit(formValues) {
      try {
        const data = formValues.toJS();
        const name = formValues.get('name');
        await new Promise((resolve, reject) => {
          updateUser({ ...data }, { resolve, reject });
        });
      } catch (error) {
        throw new SubmissionError({ _error: error });
      }
    }

    return (
      <div className={classes.root}>
        <UsersHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.editUser} />
              </h4>
            </CardHeader>
            <CardBody>
              <EditUserForm
                edit
                classes={classes}
                clusters={clusters}
                onSubmit={doSubmit}
                initialValues={user}
              />
            </CardBody>
            <CardFooter className={classes.cardFooter}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={submitForm}
              >
                Update
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
  location: makeSelectLocation(),
  user: makeSelectEditingUser(),
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
)(EditUserPage);
