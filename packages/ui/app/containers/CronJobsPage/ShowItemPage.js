/**
 *
 * CronJobDetailPage
 *
 */
import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import Helmet from 'components/Helmet/Helmet';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import {
  makeSelectCurrentID,
  makeSelectCurrent,
  makeSelectURL,
} from 'ducks/cronJobs/selectors';
import * as podsActions from 'ducks/pods/actions';
import * as actions from 'ducks/cronJobs/actions';
import PodsTable from 'containers/PodsPage/PodsTable';

import CronJob from './Item';
import messages from './messages';
import useStyles from './styles';

export const CronJobDetailPage = ({
  clusterID,
  namespaceID,
  cronJobID,
  cronJob,
  url,
  loadPods,
  readCronJob,
}) => {
  const classes = useStyles();
  const podUrl = cronJob.getIn(['links', 'pods']);
  useEffect(() => {
    const loadCronJobAndPods = () => {
      readCronJob(cronJobID, {
        clusterID,
        namespaceID,
        url: `${url}/${cronJobID}`,
      });
      if (podUrl) {
        loadPods({ url: podUrl, clusterID, namespaceID, cronJobID });
      }
    };
    loadCronJobAndPods();
    const timer = setInterval(loadCronJobAndPods, 3000);

    return () => clearInterval(timer);
  }, [url, podUrl, readCronJob, cronJobID, clusterID, namespaceID, loadPods]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/cronJobs`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.cronJobDetail} />,
            },
          ]}
        />
        <CronJob cronJob={cronJob} />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.pods} />
                </h4>
              </CardHeader>
              <CardBody>
                <PodsTable parentType="cj" />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  cronJobID: makeSelectCurrentID(),
  url: makeSelectURL(),
  cronJob: makeSelectCurrent(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      ...podsActions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CronJobDetailPage);
