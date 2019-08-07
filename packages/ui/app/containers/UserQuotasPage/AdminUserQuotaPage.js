/**
 *
 * AdminUserQuotaPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Link } from 'react-router-dom';
import { SubmissionError, submit } from 'redux-form';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { fromJS } from 'immutable';

import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ErrorInfo from 'components/ErrorInfo/ErrorInfo';

import {
  makeSelectURL,
  makeSelectUserQuotasList,
  makeSelectDeleteUserQuotaError
} from 'ducks/userQuotas/selectors';
import * as actions from 'ducks/userQuotas/actions';

import messages from './messages';
import styles from './styles';
import AdminUserQuotasTable from './AdminUserQuotasTable';
import AdminUserQuotaPageHelmet from './helmet';
import UserQuotaForm from './form/searchForm';

export const formName = 'searchUserQuotaForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = [];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const SearchUserQuotaForm = reduxForm({
  form: formName,
  validate,
})(UserQuotaForm);

/* eslint-disable react/prefer-stateless-function */
export class AdminUserQuotaPage extends React.PureComponent {
  static propTypes = {};

  state = {
    filter: {},
  };

  componentWillMount() {
    this.load();
    this.timer = setInterval(() => this.load(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  load() {
    const { loadUserQuotas, url } = this.props;
    loadUserQuotas(url);
  }

  render() {
    const { classes, submitForm, deleteError,clearDeleteErrorInfo } = this.props;
    const doSubmit = (formValues) => {
      this.setState({
        filter: formValues.toJS(),
      });
    };

    return (
      <div className={classes.root}>
        <AdminUserQuotaPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: '/adminUserQuotas',
                name: <FormattedMessage {...messages.adminRequestListPage} />,
              },
            ]}
          />
          <GridContainer className={classes.grid}>
            {deleteError ? (
              <ErrorInfo 
                errorText = {deleteError}
                close = {clearDeleteErrorInfo}
              />
            ):null}
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.requestList} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer style={{ marginBottom: '20px' }}>
                    <GridItem xs={6} sm={6} md={6}>
                      <SearchUserQuotaForm
                        classes={classes}
                        onSubmit={doSubmit}
                      />
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={submitForm}
                        style={{ marginTop: '10px' }}
                      >
                        <FormattedMessage {...messages.searchUserQuotaButton} />
                      </Button>
                    </GridItem>
                  </GridContainer>
                  <AdminUserQuotasTable filter={this.state.filter} />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
  deleteError: makeSelectDeleteUserQuotaError(),
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
)(AdminUserQuotaPage);
