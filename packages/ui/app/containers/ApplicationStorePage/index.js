/**
 *
 * ApplicationStorePage
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
import AddIcon from 'components/Icons/Add';
import Button from '@material-ui/core/Button';

import { makeSelectURL } from 'ducks/userQuotas/selectors';
import * as actions from 'ducks/userQuotas/actions';

import messages from './messages';
import styles from './styles';
//import ApplicationsTable from './ApplicationsTable';
import ApplicationStorePageHelmet from './helmet';
import SearchForm from './form/searchForm';


export const formName = 'searchApplicationsForm';

const validate = (values) => {
  const errors = {};
  return errors;
};

const SearchApplicationsForm = reduxForm({
  form: formName,
  validate,
})(SearchForm);

/* eslint-disable react/prefer-stateless-function */
export class ApplicationStorePage extends React.PureComponent {

  componentWillMount() {
    // this.load();
    // this.timer = setInterval(() => this.load(), 3000);
  }

  componentWillUnmount() {
    // clearInterval(this.timer);
  }

  load() {
    // const { loadApplications, url } = this.props;
    // loadApplications(url);
  }

  render() {
    const { classes, submitForm } = this.props;
    const doSubmit = (formValues) => {
      this.setState({
        filter: formValues.toJS(),
      });
    };

    return (
      <div className={classes.root}>
        <ApplicationStorePageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: '/applicationStore',
                name: <FormattedMessage {...messages.pageTitle} />,
              },
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card className={classes.card}>
                <GridContainer style={{ marginBottom: '20px' }}>
                  <GridItem xs={3} sm={3} md={3}>
                      <SearchApplicationsForm   
                        classes={classes}
                        onSubmit={doSubmit}
                      />
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={submitForm}
                        style={{ marginTop: '10px'}}
                      >
                        <FormattedMessage {...messages.searchApplicationsButton} />
                      </Button>
                    </GridItem>
                  </GridContainer>
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
)(ApplicationStorePage);
