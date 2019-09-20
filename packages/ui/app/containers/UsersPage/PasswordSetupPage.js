/**
 *
 * Password Setup
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
import { SubmissionError, submit } from 'redux-form';
import SHA1 from 'crypto-js/sha1';
import encHex from 'crypto-js/enc-hex';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Helmet from 'components/Helmet/Helmet';

import * as actions from 'ducks/users/actions';
import {
  makeSelectCurrent,
  makeSelectCurrentID,
  makeSelectURL,
} from 'ducks/users/selectors';
import { makeSelectRole, makeSelectIsAdmin } from 'ducks/role/selectors';
import { makeSelectLocation } from 'ducks/app/selectors';

import { usePush } from 'hooks/router';

import messages from './messages';
import useStyles from './styles';
import PasswordForm from './PasswordForm';

export const formName = 'passwordSetupForm';

const validate = (values) => {
  const errors = {};
  return errors;
};

const PasswordSetupForm = reduxForm({
  form: formName,
  validate,
})(PasswordForm);

export const PasswordSetupPage = ({
  clusters,
  submitForm,
  user,
  id,
  url,
  isAdmin,
  readUser,
  updateUser,
  executeUserAction,
}) => {
  const classes = useStyles();
  const push = usePush();
  useEffect(() => {
    readUser(id, { url: `${url}/${id}` });
  }, [id, readUser, url]);

  async function doSubmit(formValues) {
    try {
      const hash = (str) => SHA1(str).toString(encHex);
      if (isAdmin && user.get('name') !== 'admin') {
        const data = user
          .set('password', hash(formValues.get('newPassword')))
          .toJS();
        await new Promise((resolve, reject) => {
          updateUser(data, {
            url: user.getIn(['links', 'update']),
            resolve,
            reject,
          });
        });
      } else {
        const data = {
          id,
          oldPassword: hash(formValues.get('oldPassword')),
          newPassword: hash(formValues.get('newPassword')),
        };
        await new Promise((resolve, reject) => {
          executeUserAction('resetPassword', data, {
            url: user.getIn(['links', 'self']),
            resolve,
            reject,
          });
        });
      }
      push(`/users/${id}/profile`);
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              name: <FormattedMessage {...messages.passwordSetup} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.passwordSetup} />
                </h4>
              </CardHeader>
              <CardBody>
                <PasswordSetupForm
                  classes={classes}
                  onSubmit={doSubmit}
                  isAdmin={isAdmin}
                  user={user}
                />
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={submitForm}
                >
                  <FormattedMessage {...messages.updatePassword} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  isAdmin: makeSelectIsAdmin(),
  id: makeSelectCurrentID(),
  user: makeSelectCurrent(),
  url: makeSelectURL(),
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

export default compose(withConnect)(PasswordSetupPage);
