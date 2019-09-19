/**
 *
 * User Profile
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
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import KeyIcon from '@material-ui/icons/VpnKey';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import * as actions from 'ducks/users/actions';
import { makeSelectEditingUser, makeSelectUID } from 'ducks/users/selectors';
import { makeSelectData as makeSelectNamespacesData } from 'ducks/namespaces/selectors';
import { makeSelectClusters } from 'ducks/clusters/selectors';

import messages from './messages';
import UsersHelmet from './helmet';
import styles from './styles';
import UserForm from './UserForm';

export const formName = 'userProfileForm';

const validate = (values) => {
  const errors = {};
  return errors;
};

const UserProfileForm = reduxForm({
  form: formName,
  validate,
})(UserForm);

export const UserProfilePage = ({
  classes,
  clusters,
  namespacesData,
  updateUser,
  submitForm,
  user,
}) => (
  <div className={classes.root}>
    <UsersHelmet />
    <CssBaseline />
    <div className={classes.content}>
      <Breadcrumbs
        data={[
          {
            name: <FormattedMessage {...messages.userProfile} />,
          },
        ]}
      />
      <GridContainer className={classes.grid}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader>
              <h4>
                <FormattedMessage {...messages.userProfile} />
                <Link
                  to={`/users/${user && user.get('id')}/passwd`}
                  className={classes.createBtnLink}
                >
                  <Fab size="small" color="default" aria-label="create user">
                    <KeyIcon />
                  </Fab>
                </Link>
              </h4>
            </CardHeader>
            <CardBody>
              <UserProfileForm
                profile
                classes={classes}
                clusters={clusters}
                namespacesData={namespacesData}
                initialValues={user}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  clusters: makeSelectClusters(),
  namespacesData: makeSelectNamespacesData(),
  user: makeSelectEditingUser(),
  uid: makeSelectUID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
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
)(UserProfilePage);
