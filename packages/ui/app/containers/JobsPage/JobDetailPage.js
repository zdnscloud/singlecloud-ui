/**
 *
 * JobDetailPage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MinimizeIcon from '@material-ui/icons/Minimize';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import { makeSelectJobID, makeSelectCurrentJob } from 'ducks/jobs/selectors';
import * as podsActions from 'ducks/pods/actions';
import * as actions from 'ducks/jobs/actions';
import { makeSelectJOBURL as makeSelectJOBPodsURL } from 'ducks/pods/selectors';
import PodsTable from 'containers/PodsPage/PodsTable';

import Job from './Job';
import messages from './messages';
import JobDetailPageHelmet from './helmet';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class JobDetailPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  timer = null;

  componentWillMount() {
    this.loadJobAndPods();
    this.timer = setInterval(() => {
      if (this.timer) {
        this.loadJobAndPods();
      }
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  loadJobAndPods() {
    const {
      clusterID,
      namespaceID,
      jobID,
      job,
      podsUrl: url,
      loadJOBPods,
      loadJob,
    } = this.props;
    loadJob(jobID, {
      clusterID,
      namespaceID,
      url: job.getIn(['links', 'self']),
    });
    loadJOBPods({ url, clusterID, namespaceID, jobID });
  }

  render() {
    const { classes, job } = this.props;

    return (
      <div className={classes.root}>
        <JobDetailPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/clusters/${clusterID}/namespaces/${namespaceID}/jobs`,
                name: <FormattedMessage {...messages.pageTitle} />,
              },
              {
                path: '#',
                name: <FormattedMessage {...messages.jobDetail} />,
              },
            ]}
          />
          <Job job={job} />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.pods} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <PodsTable parentType="job" />
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
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  jobID: makeSelectJobID(),
  podsUrl: makeSelectJOBPodsURL(),
  job: makeSelectCurrentJob(),
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

export default compose(
  withConnect,
  withStyles(styles)
)(JobDetailPage);
