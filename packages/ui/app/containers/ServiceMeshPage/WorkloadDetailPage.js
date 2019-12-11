/**
 *
 * WorkloadDetailPage
 *
 */
import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'components/Icons/Add';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import {
  makeSelectCurrentID as makeSelectNamespaceID,
  makeSelectURL,
} from 'ducks/namespaces/selectors';

import * as actions from 'ducks/namespaces/actions';

import useStyles from './styles';
import messages from './messages';
import Table from './WorkloadTable';
import TableChart from './charts/TableChart';

const WorkloadDetailPage = ({
  clusterID,
  namespaceID,
  location,
  url,
  loadNamespaces,
}) => {
  const classes = useStyles();
  const workload ={};
  useEffect(() => {
    if (url) {
      // loadNamespaces(url, {
      //   // clusterID,
      //   // namespaceID,
      // });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [loadNamespaces, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/workloadGroup`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.workloadDetailPageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <TableChart data={workload}/>
        <GridItem xs={12} sm={12} md={12}>
            <Card>
            <CardHeader>
                <h4>
                  <FormattedMessage {...messages.WorkloadCardTitle} /> /
                </h4>
              </CardHeader>
              <CardBody>
                <Table parentType="workload"/>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.InboundCardTitle} />
                </h4>
              </CardHeader>
              <CardBody>
                <Table parentType="inbound"/>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.OutboundCardTitle} />
                </h4>
              </CardHeader>
              <CardBody>
                <Table parentType="outbound"/>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.PodsCardTitle} />
                </h4>
              </CardHeader>
              <CardBody>
                <Table parentType="pods"/>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.TCPCardTitle} />
                </h4>
              </CardHeader>
              <CardBody>
                <Table parentType="tcp"/>
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
  url: makeSelectURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(WorkloadDetailPage);
