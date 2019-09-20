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

import * as actions from 'ducks/networks/actions';
import {
  makeSelectCurrentID as makeSelectClusterID,
  makeSelectCurrent as makeSelectCurrentCluster,
} from 'ducks/clusters/selectors';

import {
  makeSelectServiceNetworks,
  makeSelectPodNetworks,
  makeSelectCurrentServiceNetworks,
  makeSelectCurrentPodNetworks,
  makeSelectPodURL,
  makeSelectServiceURL,
} from 'ducks/networks/selectors';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import NetworkPageHelmet from './helmet';
import useStyles from './styles';
import Node from './Node';
import ServiceTable from './ServiceTable';
import PodsList from './PodsList';

const NetworkPage = ({
  clusterID,
  cluster,
  loadPodNetworks,
  loadServiceNetworks,
  services,
  pods,
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
      <NetworkPageHelmet />
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
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  cluster: makeSelectCurrentCluster(),
  services: makeSelectCurrentServiceNetworks(),
  pods: makeSelectCurrentPodNetworks(),
  podurl: makeSelectPodURL(),
  serviceurl: makeSelectServiceURL(),
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

export default compose(withConnect)(NetworkPage);
