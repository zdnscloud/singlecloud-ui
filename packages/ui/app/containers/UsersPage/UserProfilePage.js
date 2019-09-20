/**
 *
 * User Profile
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector, createSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { Link } from 'react-router-dom';

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
import Helmet from 'components/Helmet/Helmet';

import * as actions from 'ducks/users/actions';
import {
  makeSelectCurrent,
  makeSelectCurrentID,
  makeSelectURL,
} from 'ducks/users/selectors';
import { makeSelectData as makeSelectNamespacesData } from 'ducks/namespaces/selectors';
import { makeSelectClusters } from 'ducks/clusters/selectors';

import messages from './messages';
import useStyles from './styles';
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
  clusters,
  namespacesData,
  updateUser,
  submitForm,
  user,
  id,
  url,
  readUser,
}) => {
  const classes = useStyles();
  useEffect(() => {
    readUser(id, { url: `${url}/${id}` });
  }, [id, readUser, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
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
                {user.size === 0 ? null : (
                  <UserProfileForm
                    profile
                    classes={classes}
                    clusters={clusters}
                    namespacesData={namespacesData}
                    initialValues={user}
                  />
                )}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusters: makeSelectClusters(),
  namespacesData: makeSelectNamespacesData(),
  id: makeSelectCurrentID(),
  user: makeSelectCurrent(),
  url: makeSelectURL(),
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

export default compose(withConnect)(UserProfilePage);
