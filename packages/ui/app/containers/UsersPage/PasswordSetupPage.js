/**
 *
 * Password Setup
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
import SHA1 from 'crypto-js/sha1';
import encHex from 'crypto-js/enc-hex';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import * as actions from 'ducks/users/actions';
import { makeSelectEditingUser, makeSelectUID } from 'ducks/users/selectors';
import { makeSelectRole, makeSelectIsAdmin } from 'ducks/role/selectors';
import { makeSelectLocation } from 'ducks/app/selectors';
import { makeSelectClustersAndNamespaces } from 'ducks/clusters/selectors';

import messages from './messages';
import UsersHelmet from './helmet';
import styles from './styles';
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

/* eslint-disable react/prefer-stateless-function */
export class PasswordSetupPage extends React.PureComponent {
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
      resetPassword,
      submitForm,
      user,
      uid,
      isAdmin,
    } = this.props;
    async function doSubmit(formValues) {
      try {
        const hash = (str) => SHA1(str).toString(encHex);
        const data = {
          id: uid,
          oldPassword: hash(formValues.get('oldPassword')),
          newPassword: hash(formValues.get('newPassword')),
        };
        await new Promise((resolve, reject) => {
          resetPassword(data, { resolve, reject });
        });
      } catch (error) {
        console.error(error);
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
                  name: <FormattedMessage {...messages.passwordSetup} />,
                },
              ]}
            />
            <GridContainer className={classes.grid}>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>
                      <FormattedMessage {...messages.passwordSetup} />
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <PasswordSetupForm
                      classes={classes}
                      clusters={clusters}
                      onSubmit={doSubmit}
                      isAdmin={isAdmin}
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
  }
}

const mapStateToProps = createStructuredSelector({
  clusters: makeSelectClustersAndNamespaces(),
  location: makeSelectLocation(),
  isAdmin: makeSelectIsAdmin(),
  uid: makeSelectUID(),
  user: makeSelectEditingUser(),
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
)(PasswordSetupPage);
