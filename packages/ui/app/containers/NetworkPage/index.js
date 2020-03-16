/**
 *
 * ConfigMapsPage
 *
 */

import React, { useEffect, useState } from 'react';
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
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Helmet from 'components/Helmet/Helmet';

import * as sActions from 'ducks/serviceNetworks/actions';
import * as pActions from 'ducks/podNetworks/actions';
import * as nActions from 'ducks/nodeNetworks/actions';
import {
  makeSelectCurrentID as makeSelectClusterID,
  makeSelectCurrent as makeSelectCurrentCluster,
} from 'ducks/clusters/selectors';
import {
  makeSelectServiceNetworksList,
  makeSelectURL as makeSelectServiceNetworksURL,
} from 'ducks/serviceNetworks/selectors';
import {
  makeSelectPodNetworksList,
  makeSelectURL as makeSelectPodNetworksURL,
} from 'ducks/podNetworks/selectors';
import {
  makeSelectNodeNetworksList,
  makeSelectURL as makeSelectNodeNetworksURL,
} from 'ducks/nodeNetworks/selectors';

import messages from './messages';
import useStyles from './styles';
import Node from './Node';
import ServiceTable from './ServiceTable';
import PodsList from './PodsList';

const NetworkPage = ({
  clusterID,
  loadServiceNetworks,
  loadPodNetworks,
  loadNodeNetworks,
  serviceNetworks,
  podNetworks,
  nodeNetworks,
  serviceUrl,
  podUrl,
  nodeUrl,
}) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    let t = null;
    if (podUrl) {
      loadPodNetworks(podUrl, { clusterID });
      t = setInterval(() => {
        loadPodNetworks(podUrl, { clusterID });
      }, 3000);
    }
    return () => {
      clearInterval(t);
    };
  }, [clusterID, loadPodNetworks, podUrl]);

  useEffect(() => {
    let t = null;
    if (serviceUrl) {
      loadServiceNetworks(serviceUrl, { clusterID });
      t = setInterval(() => {
        loadServiceNetworks(serviceUrl, { clusterID });
      }, 3000);
    }
    return () => {
      clearInterval(t);
    };
  }, [clusterID, loadServiceNetworks, serviceUrl]);

  useEffect(() => {
    let t = null;
    if (nodeUrl) {
      loadNodeNetworks(nodeUrl, { clusterID });
      t = setInterval(() => {
        loadNodeNetworks(nodeUrl, { clusterID });
      }, 3000);
    }
    return () => {
      clearInterval(t);
    };
  }, [clusterID, loadNodeNetworks, nodeUrl]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
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
              <CardHeader>
                <h4 className={classes.customCardHeaderH4}>
                  <Tabs
                    value={tab}
                    onChange={(evt, val) => setTab(val)}
                    textColor="inherit"
                    classes={{
                      indicator: classes.indicator,
                    }}
                  >
                    <Tab label={<FormattedMessage {...messages.podIP} />} />
                    <Tab label={<FormattedMessage {...messages.serviceIP} />} />
                  </Tabs>
                </h4>
              </CardHeader>
              <CardBody>
                {tab === 0 ? (
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <PodsList
                        data={podNetworks}
                        nodeNetworks={nodeNetworks}
                      />
                    </GridItem>
                  </GridContainer>
                ) : (
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <ServiceTable data={serviceNetworks} />
                    </GridItem>
                  </GridContainer>
                )}
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
  serviceNetworks: makeSelectServiceNetworksList(),
  podNetworks: makeSelectPodNetworksList(),
  nodeNetworks: makeSelectNodeNetworksList(),
  serviceUrl: makeSelectServiceNetworksURL(),
  podUrl: makeSelectPodNetworksURL(),
  nodeUrl: makeSelectNodeNetworksURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...sActions,
      ...pActions,
      ...nActions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NetworkPage);
