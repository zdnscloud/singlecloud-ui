/**
 *
 * WorkFlowDetailPage
 *
 */
import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
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
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import {
  makeSelectCurrentID,
  makeSelectCurrent,
  makeSelectURL,
} from 'ducks/workFlows/selectors';
import * as podsActions from 'ducks/pods/actions';
import * as actions from 'ducks/workFlows/actions';
import PodsTable from 'containers/PodsPage/PodsTable';

import Item from './Item';
import messages from './messages';
import useStyles from './styles';

export const WorkFlowDetailPage = ({
  clusterID,
  namespaceID,
  workFlowID,
  workFlow,
  url,
  loadPods,
  readWorkFlow,
}) => {
  const classes = useStyles();
  const podUrl = workFlow.getIn(['links', 'pods']);
  useEffect(() => {
    readWorkFlow(workFlowID, {
      clusterID,
      namespaceID,
      url: `${url}/${workFlowID}`,
    });
    const loadWorkFlowAndPods = () => {
      if (podUrl) {
        loadPods(podUrl, { clusterID, namespaceID, workFlowID });
      }
    };
    loadWorkFlowAndPods();
    const timer = setInterval(loadWorkFlowAndPods, 3000);

    return () => clearInterval(timer);
  }, [
    url,
    podUrl,
    readWorkFlow,
    workFlowID,
    clusterID,
    namespaceID,
    loadPods,
  ]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/workFlows`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.detailPageTitle} />,
            },
          ]}
        />
        <Item workFlow={workFlow} />
        {/* <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.pods} />
                </h4>
              </CardHeader>
              <CardBody>
                <PodsTable />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer> */}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  workFlowID: makeSelectCurrentID(),
  url: makeSelectURL(),
  workFlow: makeSelectCurrent(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      ...podsActions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(WorkFlowDetailPage);
