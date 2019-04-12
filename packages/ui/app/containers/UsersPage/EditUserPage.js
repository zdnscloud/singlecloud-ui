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
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';

import * as actions from 'ducks/users/actions';
import { makeSelectEditingUser, makeSelectUID } from 'ducks/users/selectors';
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
    this.props.loadUser(this.props.uid);
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
  uid: makeSelectUID(),
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
