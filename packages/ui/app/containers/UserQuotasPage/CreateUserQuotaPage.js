/**
 *
 * Create UserQuota Page
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';
import { Link } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import encHex from 'crypto-js/enc-hex';

import { usePush } from 'hooks/router';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';

import { makeSelectURL } from 'ducks/userQuotas/selectors';
import { makeSelectRole } from 'ducks/role/selectors';
import * as actions from 'ducks/userQuotas/actions';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import useStyles from './styles';
import UserQuotasPageHelmet from './helmet';
import UserQuotaForm from './UserQuotaForm';

export const formName = 'createUserQuotaForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['namespace', 'cpu', 'memory', 'storage', 'purpose'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const CreateUserQuotaForm = reduxForm({
  form: formName,
  validate,
})(UserQuotaForm);

const CreateUserQuotaPage = ({ url, createUserQuota, submitForm, role }) => {
  const classes = useStyles();
  const push = usePush();
  const user = role.get('user');
  const userHash = sha256(user)
    .toString(encHex)
    .slice(0, 6);
  async function doSubmit(formValues) {
    try {
      const { memory, storage, namespace, ...formData } = formValues.toJS();
      const data = {
        namespace: `${namespace}-${userHash}`,
        memory: `${memory}Gi`,
        storage: `${storage}Gi`,
        ...formData,
      };
      await new Promise((resolve, reject) => {
        createUserQuota({ ...data }, { resolve, reject, url });
      });
      push(`/userQuotas`);
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  return (
    <div className={classes.root}>
      <UserQuotasPageHelmet />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/userQuotas`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.createUserQuota} />,
            },
          ]}
        />
        <Typography component="div" className="">
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <h4>
                    <FormattedMessage {...messages.createUserQuota} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <CreateUserQuotaForm
                    classes={classes}
                    onSubmit={doSubmit}
                    userHash={userHash}
                    formRole="create"
                    role={role}
                  />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={submitForm}
                      >
                        <FormattedMessage {...messages.createUserQuotaButton} />
                      </Button>
                      <Button
                        variant="contained"
                        className={classes.cancleBtn}
                        to="/userQuotas"
                        component={Link}
                      >
                        <FormattedMessage {...messages.cancleUserQuotaButton} />
                      </Button>
                    </GridItem>
                  </GridContainer>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
  role: makeSelectRole(),
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

export default compose(withConnect)(CreateUserQuotaPage);
