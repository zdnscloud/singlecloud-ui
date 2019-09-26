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
import {
  makeSelectCurrentID as makeSelectClusterID,
  makeSelectCurrent as makeSelectCurrentCluster,
} from 'ducks/clusters/selectors';
import {
  makeSelectServiceNetworks,
  makeSelectURL as makeSelectServiceNetworksURL,
} from 'ducks/serviceNetworks/selectors';
import {
  makeSelectPodNetworks,
  makeSelectURL as makeSelectPodNetworksURL,
} from 'ducks/podNetworks/selectors';

import messages from './messages';
import useStyles from './styles';
import Node from './Node';
import ServiceTable from './ServiceTable';
import PodsList from './PodsList';

const NetworkPage = ({
  clusterID,
  loadPodNetworks,
  loadServiceNetworks,
  serviceNetworks,
  podNetworks,
  podurl,
  serviceurl,
}) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (podurl) {
      loadPodNetworks(podurl, { clusterID });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [clusterID, loadPodNetworks, podurl]);

  useEffect(() => {
    if (serviceurl) {
      loadServiceNetworks(serviceurl, { clusterID });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [clusterID, loadServiceNetworks, serviceurl]);

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
              <CardHeader style={{ padding: 0 }}>
                <h4>
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
                      <PodsList data={podNetworks} />
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
  serviceNetworks: makeSelectServiceNetworks(),
  podNetworks: makeSelectPodNetworks(),
  podurl: makeSelectPodNetworksURL(),
  serviceurl: makeSelectServiceNetworksURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...sActions,
      ...pActions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(NetworkPage);
