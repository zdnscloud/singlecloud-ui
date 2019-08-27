/**
 *
 * RequestUserQuotaPage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { SubmissionError, submit } from 'redux-form';
import { Link } from 'react-router-dom';
import { reduxForm, getFormValues } from 'redux-form/immutable';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import { makeSelectClusters } from 'ducks/clusters/selectors';

import Button from '@material-ui/core/Button';

import {
  makeSelectCurrentUserQuota,
  makeSelectURL,
} from 'ducks/userQuotas/selectors';
import * as actions from 'ducks/userQuotas/actions';

import messages from './messages';
import RequestUserQuotaPageHelmet from './helmet';
import styles from './styles';
import RequestUserQuotaForm from './RequestUserQuotaForm';

export const formName = 'CreateRequestUserQuotaForm';

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

const CreateRequestUserQuotaForm = reduxForm({
  form: formName,
  validate,
})(RequestUserQuotaForm);

export class RequestUserQuotaPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  componentWillMount() {
    this.load();
  }

  load() {
    const { loadUserQuotas, url } = this.props;
    loadUserQuotas(url);
  }

  render() {
    const {
      classes,
      userQuota,
      submitForm,
      requestUserQuota,
      clusters,
    } = this.props;
    const getClickedAction = () => this.clickedAction;
    async function doSubmit(formValues) {
      try {
        const { clusterName, reason } = formValues.toJS();
        const action = getClickedAction();
        const url = `${userQuota.getIn(['links', 'self'])}?action=${action}`;
        const data = action === 'approval' ? { clusterName } : { reason };
        await new Promise((resolve, reject) => {
          requestUserQuota({ ...data }, { resolve, reject, url });
        });
      } catch (error) {
        throw new SubmissionError({ _error: error });
      }
    }
    return (
      <div className={classes.root}>
        <RequestUserQuotaPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/adminUserQuotas`,
                name: <FormattedMessage {...messages.adminRequestListPage} />,
              },
              {
                name: <FormattedMessage {...messages.requestDetail} />,
              },
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <h4>
                    <FormattedMessage {...messages.detail} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <CreateRequestUserQuotaForm
                    classes={classes}
                    onSubmit={doSubmit}
                    initialValues={userQuota}
                    userQuota={userQuota}
                    clusters={clusters}
                  />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          this.clickedAction = 'approval';
                          submitForm();
                        }}
                      >
                        <FormattedMessage {...messages.passBtn} />
                      </Button>
                      <Button
                        variant="contained"
                        className={classes.cancleBtn}
                        onClick={() => {
                          this.clickedAction = 'reject';
                          submitForm();
                        }}
                      >
                        <FormattedMessage {...messages.rejectBtn} />
                      </Button>
                    </GridItem>
                  </GridContainer>
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
  userQuota: makeSelectCurrentUserQuota(),
  url: makeSelectURL(),
  clusters: makeSelectClusters(),
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
)(RequestUserQuotaPage);
