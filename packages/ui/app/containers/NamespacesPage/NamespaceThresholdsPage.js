/**
 *
 * Cluster Thresholds Page
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

import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'components/Icons/Add';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Helmet from 'components/Helmet/Helmet';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectURL } from 'ducks/namespaceThresholds/selectors';
import * as actions from 'ducks/namespaceThresholds/actions';

import { usePush } from 'hooks/router';

import messages from './messages';
import useStyles from './styles';
import Form from './NamespaceThresholdsForm';

export const formName = 'namespaceThresholdsForm';

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

const NamespaceThresholdsForm = reduxForm({
  form: formName,
  validate,
})(Form);

export const NamespaceThresholdsPage = ({
  url,
  clusterID,
  submitForm,
  createNamespace,
}) => {
  const classes = useStyles();
  const push = usePush();

  async function doSubmit(formValues) {
    try {
      const { name, cpu, memory, storage } = formValues.toJS();
      const data = {
        name,
        limits: {
          'requests.storage': `${storage}Gi`,
        },
      };

      const { response } = await new Promise((resolve, reject) => {
        createNamespace({ name }, { resolve, reject, clusterID, url });
      });
      const {
        id: nsID,
        links: { resourcequotas: rqURL },
      } = response;
      push(`/clusters/${clusterID}/namespaces`);
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
              path: `/clusters/${clusterID}/namespaces`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.createNamespace} />,
            },
          ]}
        />
        <Typography component="div" className="">
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <h4>
                    <FormattedMessage {...messages.createNamespace} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <NamespaceThresholdsForm
                    classes={classes}
                    onSubmit={doSubmit}
                    initialValues={fromJS({ name: '' })}
                    type="create"
                  />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                  >
                    <FormattedMessage {...messages.createNamespaceButton} />
                  </Button>
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
  clusterID: makeSelectCurrentClusterID(),
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

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NamespaceThresholdsPage);
