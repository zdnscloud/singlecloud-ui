/**
 *
 * DaemonSetDetailPage
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
} from 'containers/App/selectors';
import {
  makeSelectDaemonSetID,
  makeSelectCurrentDaemonSet,
} from 'ducks/daemonSets/selectors';
import * as podsActions from 'ducks/pods/actions';
import * as actions from 'ducks/daemonSets/actions';
import { makeSelectDSURL as makeSelectDSPodsURL } from 'ducks/pods/selectors';
import PodsTable from 'containers/PodsPage/PodsTable';

import DaemonSet from './DaemonSet';
import messages from './messages';
import DaemonSetDetailPageHelmet from './helmet';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class DaemonSetDetailPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  timer = null;

  componentWillMount() {
    this.loadDaemonSetAndPods();
    this.timer = setInterval(() => {
      if (this.timer) {
        this.loadDaemonSetAndPods();
      }
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  loadDaemonSetAndPods() {
    const {
      clusterID,
      namespaceID,
      daemonSetID,
      daemonSet,
      podsUrl: url,
      loadDSPods,
      loadDaemonSet,
    } = this.props;
    loadDaemonSet(daemonSetID, {
      clusterID,
      namespaceID,
      url: daemonSet.getIn(['links', 'self']),
    });
    loadDSPods({ url, clusterID, namespaceID, daemonSetID });
  }

  render() {
    const { classes, daemonSet } = this.props;

    return (
      <div className={classes.root}>
        <DaemonSetDetailPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <DaemonSet daemonSet={daemonSet} />
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.pods} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <PodsTable parentType="ds" />
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
  daemonSetID: makeSelectDaemonSetID(),
  podsUrl: makeSelectDSPodsURL(),
  daemonSet: makeSelectCurrentDaemonSet(),
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
)(DaemonSetDetailPage);
