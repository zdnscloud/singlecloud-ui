/**
 *
 * Edit User
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

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
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

import { usePush } from 'hooks/router';

import messages from './messages';
import useStyles from './styles';
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

export const EditUserPage = ({
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
  const push = usePush();
  useEffect(() => {
    readUser(id, { url: `${url}/${id}` });
  }, [id, readUser, url]);

  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();
      await new Promise((resolve, reject) => {
        updateUser(data, {
          url: user.getIn(['links', 'update']),
          resolve,
          reject,
        });
      });
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
              name: <FormattedMessage {...messages.editUser} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.editUser} />
                </h4>
              </CardHeader>
              <CardBody>
                {user.size === 0 ? null : (
                  <EditUserForm
                    edit
                    classes={classes}
                    clusters={clusters}
                    namespacesData={namespacesData}
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
};

const mapStateToProps = createStructuredSelector({
  clusters: makeSelectClusters(),
  namespacesData: makeSelectNamespacesData(),
  id: makeSelectCurrentID(),
  user: makeSelectCurrent(),
  url: makeSelectURL(),
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

export default compose(withConnect)(EditUserPage);
