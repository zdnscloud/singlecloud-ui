/* eslint-disable no-param-reassign */
/**
 *
 * Create Cluster Page
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

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Helmet from 'components/Helmet/Helmet';

import { usePush } from 'hooks/router';

import { makeSelectURL } from 'ducks/clusters/selectors';
import * as actions from 'ducks/clusters/actions';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import useStyles from './styles';
import ClusterForm from './CreateForm';

export const formName = 'createClusterForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'name',
    'clusterDomain',
    'singleCloudAddress',
    'sshUser',
  ];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const CreateClusterForm = reduxForm({
  form: formName,
  validate,
})(ClusterForm);

export const CreateClusterPage = ({
  submitForm,
  createCluster,
  url,
  values,
}) => {
  const classes = useStyles();
  const push = usePush();
  async function doSubmit(formValues) {
    try {
      const {
        advancedOptions,
        enableAdvancedOptions,
        nodes,
        ...formData
      } = formValues.toJS();
      const { main, work } = nodes;
      main.forEach((item) => {
        if (Object.keys(item).length !== 0) {
          if (item.roles) {
            item.roles.push('controlplane');
          } else {
            item.roles = ['controlplane'];
          }
        }
      });
      work.forEach((item) => {
        if (Object.keys(item).length !== 0) {
          if (item.roles) {
            item.roles.push('worker');
          } else {
            item.roles = ['worker'];
          }
        }
      });
      const nodeArr = main.concat(work).filter((v) => v.roles);
      const data = {
        nodes: nodeArr,
        ...formData,
        ...(enableAdvancedOptions ? advancedOptions : {}),
      };
      await new Promise((resolve, reject) => {
        createCluster(data, {
          resolve,
          reject,
          url,
        });
      });
      push('/clusters');
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
              path: '/clusters',
              name: <FormattedMessage {...messages.clusters} />,
            },
            {
              name: <FormattedMessage {...messages.createCluster} />,
            },
          ]}
        />
        <Typography component="div" className="">
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <CreateClusterForm
                classes={classes}
                onSubmit={doSubmit}
                initialValues={fromJS({
                  name: '',
                  nodes: { main: [], work: [] },
                })}
                formValues={values}
              />
              <Button variant="contained" color="primary" onClick={submitForm}>
                <FormattedMessage {...messages.createClusterButton} />
              </Button>
              <Button
                variant="contained"
                className={classes.cancleBtn}
                component={Link}
                to="/clusters"
              >
                <FormattedMessage {...messages.cancleClustersButton} />
              </Button>
            </GridItem>
          </GridContainer>
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
  values: getFormValues(formName),
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

export default compose(withConnect)(CreateClusterPage);
