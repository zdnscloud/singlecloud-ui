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
import sha256 from 'crypto-js/sha256';
import encHex from 'crypto-js/enc-hex';

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
import { makeSelectClusters } from 'ducks/clusters/selectors';
import { makeSelectNamespaces } from 'ducks/namespaces/selectors';
import * as actions from 'ducks/userQuotas/actions';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import styles from './styles';
import ApplicationsPageHelmet from './helmet';
import ApplicationsTable from './ApplicationsTable';

export const formName = 'createApplicationForm';

/* eslint-disable react/prefer-stateless-function */
export class ApplicationDetailPage extends React.PureComponent {
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
                path: `/applications`,
                name: <FormattedMessage {...messages.pageTitle} />,
              },
              {
                name: <FormattedMessage {...messages.applicationDetail} />,
              },
            ]}
          />
          <Typography component="div" className="">
            <GridContainer className={classes.grid}>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>
                      <FormattedMessage {...messages.quotasList} />
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <ApplicationsTable />
                  </CardBody>
                </Card>
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
)(ApplicationDetailPage);
