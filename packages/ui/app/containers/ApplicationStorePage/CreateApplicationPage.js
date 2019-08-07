/**
 *
 * Create Application Page
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

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import { makeSelectURL } from 'ducks/userQuotas/selectors';
import { makeSelectClusters } from 'ducks/clusters/selectors';
import { makeSelectNamespaces } from 'ducks/namespaces/selectors';
import * as actions from 'ducks/userQuotas/actions';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import styles from './styles';
import ApplicationsPageHelmet from './helmet';
import ApplicationForm from './ApplicationForm';

export const formName = 'createApplicationForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const CreateApplicationForm = reduxForm({
  form: formName,
  validate,
})(ApplicationForm);

/* eslint-disable react/prefer-stateless-function */
export class CreateApplicationPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  render() {
    const { classes, submitForm, createApplication, url, clusters, namespaces } = this.props;
    async function doSubmit(formValues) {
      try {
        const { memory, storage, namespace, ...formData } = formValues.toJS();
        const data = {
          ...formData,
        };
        await new Promise((resolve, reject) => {
          createApplication({ ...data }, { resolve, reject, url });
        });
      } catch (error) {
        throw new SubmissionError({ _error: error });
      }
    }

    return (
      <div className={classes.root}>
        <ApplicationsPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/applicationStore`,
                name: <FormattedMessage {...messages.pageTitle} />,
              },
              {
                name: <FormattedMessage {...messages.createApplication} />,
              },
            ]}
          />
          <Typography component="div" className="">
            <GridContainer className={classes.grid}>
              <GridItem xs={12} sm={12} md={12}>
                <CreateApplicationForm
                  classes={classes}
                  onSubmit={doSubmit}
                  clusters={clusters}
                  namespaces={namespaces}
                  // userHash={userHash}
                />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                  >
                    <FormattedMessage
                      {...messages.createApplicationButton}
                    />
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.cancleBtn}
                    to="/applicationStore"
                    component={Link}
                  >
                    <FormattedMessage
                      {...messages.cancleApplicationButton}
                    />
                  </Button>
                </GridItem>
            </GridContainer>
          </Typography>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
  clusters: makeSelectClusters(),
  namespaces: makeSelectNamespaces(),
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
)(CreateApplicationPage);
