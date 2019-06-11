/**
 *
 * CronJobDetailPage
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
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import {
  makeSelectCronJobID,
  makeSelectCurrentCronJob,
} from 'ducks/cronJobs/selectors';
import * as podsActions from 'ducks/pods/actions';
import * as actions from 'ducks/cronJobs/actions';
import { makeSelectCJURL as makeSelectCJPodsURL } from 'ducks/pods/selectors';
import PodsTable from 'containers/PodsPage/PodsTable';

import CronJob from './CronJob';
import messages from './messages';
import CronJobDetailPageHelmet from './helmet';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class CronJobDetailPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  timer = null;

  componentWillMount() {
    this.loadCronJobAndPods();
    this.timer = setInterval(() => {
      if (this.timer) {
        this.loadCronJobAndPods();
      }
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  loadCronJobAndPods() {
    const {
      clusterID,
      namespaceID,
      cronJobID,
      cronJob,
      podsUrl: url,
      loadCJPods,
      loadCronJob,
    } = this.props;
    loadCronJob(cronJobID, {
      clusterID,
      namespaceID,
      url: cronJob.getIn(['links', 'self']),
    });
    loadCJPods({ url, clusterID, namespaceID, cronJobID });
  }

  render() {
    const { classes, cronJob } = this.props;

    return (
      <div className={classes.root}>
        <CronJobDetailPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <CronJob cronJob={cronJob} />
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
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
  }
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  cronJobID: makeSelectCronJobID(),
  podsUrl: makeSelectCJPodsURL(),
  cronJob: makeSelectCurrentCronJob(),
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
)(CronJobDetailPage);
