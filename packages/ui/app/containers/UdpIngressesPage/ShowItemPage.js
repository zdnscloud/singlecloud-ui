/**
 *
 * UdpIngressDetailPage
 *
 */
import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

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
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import {
  makeSelectCurrentID,
  makeSelectCurrent,
  makeSelectURL,
} from 'ducks/udpIngresses/selectors';

import * as actions from 'ducks/udpIngresses/actions';

import UdpIngressRuleTable from './UdpIngressRuleTable';
import messages from './messages';
import useStyles from './styles';

export const UdpIngressDetailPage = ({
  clusterID,
  namespaceID,
  udpIngressID,
  udpIngress,
  url,
  readUdpIngress,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (url) {
      readUdpIngress(udpIngressID, {
        clusterID,
        namespaceID,
        url: `${url}/${udpIngressID}`,
      });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [clusterID, namespaceID, readUdpIngress, udpIngressID, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/udpIngresses`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.udpIngressDetail} />,
            },
          ]}
        />

        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.udpIngressDetail} />
                </h4>
              </CardHeader>
              <CardBody>
                <UdpIngressRuleTable udpIngress={udpIngress} />
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
  udpIngressID: makeSelectCurrentID(),
  url: makeSelectURL(),
  udpIngress: makeSelectCurrent(),
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

export default compose(withConnect)(UdpIngressDetailPage);
