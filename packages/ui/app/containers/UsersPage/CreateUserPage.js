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
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import * as actions from 'ducks/users/actions';
import { makeSelectClustersAndNamespaces } from 'ducks/namespaces/selectors';

import messages from './messages';
import UsersHelmet from './helmet';
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
    const { classes, clusters, createUser, submitForm } = this.props;
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
        <UsersHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
              data={[
                {
                  path: '/users',
                  name: <FormattedMessage {...messages.usersList} />,
                },
                {
                  name: <FormattedMessage {...messages.createUser} />,
                },
              ]}
            />
            <GridContainer className={classes.grid}>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>
                      <FormattedMessage {...messages.createUser} />
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <CreateUserForm
                      classes={classes}
                      clusters={clusters}
                      onSubmit={doSubmit}
                      initialValues={fromJS({ name: '', password: '', projects: [] })}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={submitForm}
                    >
                      <FormattedMessage {...messages.createUserButton} />
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
  clusters: makeSelectClustersAndNamespaces(),
  values: createSelector(
    getFormValues(formName),
    (v) => v
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
