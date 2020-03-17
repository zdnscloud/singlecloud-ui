/**
 *
 * StatefulSetDetailPage
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
} from 'ducks/statefulSets/selectors';
import * as podsActions from 'ducks/pods/actions';
import * as actions from 'ducks/statefulSets/actions';
import PodsTable from 'containers/PodsPage/PodsTable';

import Item from './Item';
import messages from './messages';
import useStyles from './styles';

export const StatefulSetDetailPage = ({
  clusterID,
  namespaceID,
  statefulSetID,
  statefulSet,
  url,
  loadSTSPods: loadPods,
  readStatefulSet,
}) => {
  const classes = useStyles();
  const podUrl = statefulSet.getIn(['links', 'pods']);
  useEffect(() => {
    readStatefulSet(statefulSetID, {
      clusterID,
      namespaceID,
      url: `${url}/${statefulSetID}`,
    });
    const loadStatefulSetAndPods = () => {
      if (podUrl) {
        loadPods(podUrl, { clusterID, namespaceID, statefulSetID });
      }
    };
    loadStatefulSetAndPods();
    const timer = setInterval(loadStatefulSetAndPods, 3000);

    return () => clearInterval(timer);
  }, [
    url,
    podUrl,
    readStatefulSet,
    statefulSetID,
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
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/statefulSets`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.statefulSetDetail} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <Item statefulSet={statefulSet} />
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.pods} />
                </h4>
              </CardHeader>
              <CardBody>
                <PodsTable parentType="sts" />
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
  statefulSetID: makeSelectCurrentID(),
  url: makeSelectURL(),
  statefulSet: makeSelectCurrent(),
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

export default compose(withConnect)(StatefulSetDetailPage);
