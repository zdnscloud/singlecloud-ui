/**
 *
 * DeploymentDetailPage
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
  makeSelectDeploymentID,
  makeSelectCurrentDeployment,
  makeSelectURL,
} from 'ducks/deployments/selectors';
import * as podsActions from 'ducks/pods/actions';
import * as actions from 'ducks/deployments/actions';
import { makeSelectURL as makeSelectPodsURL } from 'ducks/pods/selectors';
import PodsTable from 'containers/PodsPage/PodsTable';

import Deployment from './Deployment';
import messages from './messages';
import DeploymentDetailPageHelmet from './helmet';
import styles from './styles';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
/* eslint-disable react/prefer-stateless-function */
export class DeploymentDetailPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  timer = null;

  componentWillMount() {
    const { clusterID, namespaceID, url, loadDeployments } = this.props;
    loadDeployments({ url, clusterID, namespaceID });

    this.loadDeploymentAndPods();
    this.timer = setInterval(() => {
      if (this.timer) {
        this.loadDeploymentAndPods();
      }
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  loadDeploymentAndPods() {
    const {
      clusterID,
      namespaceID,
      deploymentID,
      deployment,
      podsUrl: url,
      loadPods,
      loadDeployment,
    } = this.props;
    loadDeployment(deploymentID, {
      clusterID,
      namespaceID,
      url: deployment.getIn(['links', 'self']),
    });
    loadPods({ url, clusterID, namespaceID, deploymentID });
  }

  render() {
    const { classes, deployment ,clusterID, namespaceID,} = this.props;

    return (
      <div className={classes.root}>
        <DeploymentDetailPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
        <Breadcrumbs 
            data={[
              {
                path: '/clusters/' + clusterID + '/namespaces/' + namespaceID +'/deployments',
                name: <FormattedMessage {...messages.pageTitle}/>
              },
              {
                path: '#',
                name: <FormattedMessage {...messages.deploymentDetail}/>
              }
            ]}
          />
          <Deployment deployment={deployment} />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.pods} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <PodsTable />
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
  deploymentID: makeSelectDeploymentID(),
  url: makeSelectURL(),
  podsUrl: makeSelectPodsURL(),
  deployment: makeSelectCurrentDeployment(),
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
)(DeploymentDetailPage);
