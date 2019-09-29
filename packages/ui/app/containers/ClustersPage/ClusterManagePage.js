/**
 *
 * Mange Cluster Page
 *
 */
import React, { useState, useEffect } from 'react';
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
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Helmet from 'components/Helmet/Helmet';

import {
  makeSelectCurrent,
  makeSelectCurrentID,
  makeSelectURL,
} from 'ducks/clusters/selectors';
import * as actions from 'ducks/clusters/actions';

import { usePush } from 'hooks/router';

import messages from './messages';
import useStyles from './styles';
import ClusterManageForm from './ClusterManageForm';

export const formName = 'updateClusterForm';

const validate = (values) => {
  const errors = {};
  return errors;
};

const UpdateClusterForm = reduxForm({
  form: formName,
  validate,
})(ClusterManageForm);

export const ClusterManagePage = ({
  submitForm,
  readCluster,
  updateCluster,
  values,
  id,
  cluster,
  url,
}) => {
  const push = usePush();
  const classes = useStyles();
  useEffect(() => {
    const timer = setInterval(() => {
      readCluster(id, { url: `${url}/${id}` });
    }, 3000);
    return () => clearInterval(timer);
  }, [readCluster, url, id]);
  const [nodes, setNodes] = useState(cluster.get('nodes'));

  async function doSubmit(formValues) {
    try {
      const data = {
        ...formValues.toJS(),
        nodes: nodes.toJS(),
      };
      await new Promise((resolve, reject) => {
        updateCluster(data, {
          resolve,
          reject,
          url: cluster.getIn(['links', 'update']),
          id,
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
              name: <FormattedMessage {...messages.pageTitleClusterManage} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            {cluster.size > 0 ? (
              <UpdateClusterForm
                classes={classes}
                onSubmit={doSubmit}
                initialValues={cluster}
                formValues={values}
                cluster={cluster}
                nodes={nodes}
                setNodes={setNodes}
              />
            ) : null}
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
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  values: getFormValues(formName),
  cluster: makeSelectCurrent(),
  id: makeSelectCurrentID(),
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

export default compose(withConnect)(ClusterManagePage);
