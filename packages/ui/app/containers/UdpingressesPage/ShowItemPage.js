/**
 *
 * UdpingressDetailPage
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
} from 'ducks/udpingresses/selectors';

import * as actions from 'ducks/udpingresses/actions';

import UdpingressRuleTable from './UdpingressRuleTable';
import messages from './messages';
import useStyles from './styles';

export const UdpingressDetailPage = ({
  clusterID,
  namespaceID,
  ingressID,
  udpingress,
  url,
  readIngress,
}) => {
  const classes = useStyles();
  console.log('ingressID',ingressID)
  useEffect(() => {
    if(url){
      readIngress(ingressID, {
        clusterID,
        namespaceID,
        url: `${url}/${ingressID}`,
      });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/udpingresses`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.udpingressDetail} />,
            },
          ]}
        />
       
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  <FormattedMessage {...messages.udpingressDetail} />
                </h4>
              </CardHeader>
              <CardBody>
                <UdpingressRuleTable udpingress={udpingress}/>
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
  ingressID: makeSelectCurrentID(),
  url: makeSelectURL(),
  udpingress: makeSelectCurrent(),
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
)(UdpingressDetailPage);
