/**
 *
 * MonitorsPage
 *
 */
import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

import { makeSelectClusterID } from 'ducks/app/selectors';
import { makeSelectCurrentCluster } from 'ducks/clusters/selectors';
import { makeSelectMonitorsList,makeSelectError } from 'ducks/monitors/selectors';

import * as actions from 'ducks/monitors/actions';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Switch from 'components/CustomSwitch/IOSSwitch';
import ErrorInfo from 'components/ErrorInfo/ErrorInfo';

import useStyles from './styles';
import messages from './messages';

const MonitorsPage = ({
  clusterID,
  location,
  loadMonitors,
  cluster,
  monitors,
  createMonitor,
  removeMonitor,
  error,
  clearErrorInfo
}) => {

  const [check, setCheck] = useState(false);
  const classes = useStyles();
  const url = cluster.getIn(['links', 'monitors']);
  const rurl =  monitors && monitors.getIn([0,'links','remove']);
  const ingressDomain = monitors && monitors.getIn([0,'ingressDomain']);
  const id = monitors && monitors.getIn([0,'id']);

  useEffect(() => {
    if (url) {
      loadMonitors(url, {
        clusterID,
      });
      if(ingressDomain){
        setCheck(true)
      }
      if(error){
        setCheck(false)
      }
    }
    return () => {
      // try cancel something when unmount
    };
  }, [url,error]);

  const handleChange = () => () => {
    setCheck(!check);
    if(!check){
      createMonitor({},{url,clusterID})
    }else{
      if(rurl){
        removeMonitor(id,{url:rurl,clusterID})
      }
    }
  }
  
  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <Breadcrumbs
        data={[
          {
            path: '/monitors',
            name: <FormattedMessage {...messages.pageTitle} />,
          },
        ]}
      />
      <GridContainer className={classes.grid}>
       {error ? (
          <ErrorInfo errorText={error} close={clearErrorInfo} />
        ) : null}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                  <FormattedMessage {...messages.clusterMonitor} />
                </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <Switch
                    onChange={handleChange()}
                    checked={check}
                    label={
                      <FormattedMessage
                        {...messages.open}
                      />
                    }
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={()=>window.open(ingressDomain)}
                    disabled={!ingressDomain}
                  >
                    <FormattedMessage {...messages.openMonitor} />
                  </Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  cluster: makeSelectCurrentCluster(),
  monitors: makeSelectMonitorsList(),
  error: makeSelectError(),
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
  memo
)(MonitorsPage);
