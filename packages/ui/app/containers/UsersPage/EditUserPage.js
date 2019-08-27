/**
 *
 * Edit User
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector, createSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import * as actions from 'ducks/users/actions';
import { makeSelectEditingUser, makeSelectUID } from 'ducks/users/selectors';
import { makeSelectLocation } from 'ducks/app/selectors';
import { makeSelectClustersAndNamespaces } from 'ducks/namespaces/selectors';

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
    const { classes, clusters, updateUser, submitForm, user } = this.props;
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
          <Breadcrumbs
            data={[
              {
                name: <FormattedMessage {...messages.editUser} />,
              },
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.editUser} />
                  </h4>
                </CardHeader>
                <CardBody>
                  {user.size === 0 ? null : (
                    <EditUserForm
                      edit
                      classes={classes}
                      clusters={clusters}
                      onSubmit={doSubmit}
                      initialValues={user}
                    />
                  )}
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={submitForm}
                  >
                    <FormattedMessage {...messages.updateUser} />
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
  location: makeSelectLocation(),
  uid: makeSelectUID(),
  user: makeSelectEditingUser(),
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
)(EditUserPage);
