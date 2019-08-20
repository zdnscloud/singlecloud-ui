/**
 *
 * ConfigMapsPage
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
import Paper from '@material-ui/core/Paper';
// import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Table from 'components/Table/Table';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import * as actions from 'ducks/networks/actions';
import { makeSelectClusterID } from 'ducks/app/selectors';
import { makeSelectCurrentCluster } from 'ducks/clusters/selectors';
import {
  makeSelectServiceNetworks,
  makeSelectPodNetworks,
  makeSelectCurrentServiceNetworks,
  makeSelectCurrentPodNetworks,
} from 'ducks/networks/selectors';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import NetworkPageHelmet from './helmet';
import styles from './styles';
import Node from './Node';
import ServiceTable from './ServiceTable';
import PodsList from './PodsList';
/* eslint-disable react/prefer-stateless-function */
export class NetworkPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
  };

  state = { tab: 0 };

  setTab = (evt, val) => this.setState({ tab: val });

  componentWillMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    const { clusterID: prevClusterID } = prevProps;
    const { clusterID, namespace } = this.props;
    if (clusterID !== prevClusterID) {
      this.load();
    }
  }

  load() {
    const {
      clusterID,
      cluster,
      loadPodNetworks,
      loadServiceNetworks,
    } = this.props;
    const podurl = cluster.getIn(['links', 'podnetworks']);
    const serviceurl = cluster.getIn(['links', 'servicenetworks']);
    loadPodNetworks(podurl, clusterID);
    loadServiceNetworks(serviceurl, clusterID);
  }

  render() {
    const { classes, theme, services, pods, clusterID } = this.props;

    return (
      <div className={classes.root}>
        <NetworkPageHelmet />
        <CssBaseline />
        <Paper className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/clusters/${clusterID}/network`,
                name: <FormattedMessage {...messages.pageTitle} />,
              },
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary" style={{ padding: 0 }}>
                  <h4 className={classes.cardTitleWhite}>
                    <Tabs
                      value={this.state.tab}
                      onChange={this.setTab}
                      textColor="inherit"
                      classes={{
                        indicator: classes.indicator,
                      }}
                    >
                      <Tab label={<FormattedMessage {...messages.podIP} />} />
                      <Tab
                        label={<FormattedMessage {...messages.serviceIP} />}
                      />
                    </Tabs>
                  </h4>
                </CardHeader>
                <CardBody>
                  {this.state.tab === 0 ? (
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <PodsList data={pods} />
                      </GridItem>
                    </GridContainer>
                  ) : (
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <ServiceTable data={services} />
                      </GridItem>
                    </GridContainer>
                  )}
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  cluster: makeSelectCurrentCluster(),
  services: makeSelectCurrentServiceNetworks(),
  pods: makeSelectCurrentPodNetworks(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles, { withTheme: true })
)(NetworkPage);
