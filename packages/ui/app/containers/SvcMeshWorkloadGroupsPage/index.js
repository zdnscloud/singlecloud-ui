/**
 *
 * SvcMeshWorkloadGroupsPage
 *
 */
import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import uuid from '@gsmlg/utils/uuid';
import _ from 'lodash';

import NetworkGraph from '@gsmlg/com/NetworkGraph';
import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import {
  makeSelectURL,
  makeSelectSvcMeshWorkloadGroupsList,
} from 'ducks/svcMeshWorkloadGroups/selectors';
import * as actions from 'ducks/svcMeshWorkloadGroups/actions';

import useStyles from './styles';
import messages from './messages';
import SvcMeshWorkloadGroupsTable from './Table';

const SvcMeshWorkloadGroupsPage = ({
  clusterID,
  namespaceID,
  location,
  url,
  loadSvcMeshWorkloadGroups,
  workloadGroups,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (url) {
      loadSvcMeshWorkloadGroups(url, {
        clusterID,
        namespaceID,
      });
    }
    const t = setInterval(() => {
      if (url) {
        loadSvcMeshWorkloadGroups(url, {
          clusterID,
          namespaceID,
        });
      }
    }, 3000);

    return () => {
      clearInterval(t);
    };
  }, [clusterID, loadSvcMeshWorkloadGroups, namespaceID, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/svcMeshWorkloadGroups`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
          ]}
        />
        {workloadGroups.size > 0
          ? workloadGroups.map((workloadGroup, i) => {
            const workloads = workloadGroup.get('workloads');
            const nodesData = workloads.map((wl, idx) => ({
              id: wl.get('id'),
              label: wl.getIn(['stat', 'resource', 'name']),
                kind: wl.getIn(['stat', 'resource', 'type']),
              }));
            const nodes = nodesData.toJS();

              const linkData = workloads
              .map((wl) =>
                  wl.get('destinations')
                  ? wl.get('destinations').map((tid) => ({
                        source: wl.get('id'),
                    target: tid,
                    id: `${wl.get('id')}_${tid}`,
                  }))
                  : null
              )
                .filter((wl) => wl)
                .flatten(1)
              .toJS();
            const links = linkData.map((l) => ({
              ...l,
                source: nodes[nodesData.findIndex((n) => n.id === l.source)],
              target: nodes[nodesData.findIndex((n) => n.id === l.target)],
            }));

            const data = {
              nodes,
                links,
            };
              const hasLink = links.length > 0;

              return (
              <GridContainer className={classes.grid} key={i}>
                  {hasLink ? (
                  <GridItem xs={12} sm={12} md={12}>
                      <Card>
                      <CardBody>
                        <NetworkGraph
                          ariaLabel="network-graph"
                          width={600}
                            height={360}
                          graph={data}
                          renderTooltip={null}
                          /* waitingForLayoutLabel={null} */
                        />
                      </CardBody>
                      </Card>
                  </GridItem>
                  ) : null}
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader>
                        <h4>
                        <FormattedMessage
                          {...messages.svcMeshWorkloadGroups}
                        />
                      </h4>
                    </CardHeader>
                      <CardBody>
                      <SvcMeshWorkloadGroupsTable
                          data={workloads}
                        workloadID={workloadGroup.get('id')}
                        />
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
              );
          })
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  url: makeSelectURL(),
  workloadGroups: makeSelectSvcMeshWorkloadGroupsList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(SvcMeshWorkloadGroupsPage);
