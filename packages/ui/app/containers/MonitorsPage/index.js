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
import { makeSelectMonitors,makeSelectError } from 'ducks/monitors/selectors';

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
  const [isPending, setPending] = useState(false);
  const classes = useStyles();
  const url = cluster.getIn(['links', 'monitors']);
  const monitor = monitors.first();
  const rurl =  monitor && monitor.getIn(['links','remove']);
  const redirectUrl = monitor && monitor.getIn(['redirectUrl']);
  const id = monitor && monitor.getIn(['id']);

  useEffect(() => {
    if (url) {
      loadMonitors(url, {
        clusterID,
      });
    };
    if(redirectUrl) {
      setCheck(true);
    }else {
      setCheck(false)
    }
    return () => {
      clearErrorInfo()
    }
  }, [url,redirectUrl]);

  const handleChange = () => () => {
    setPending(true);
    setCheck(!check);
    const delayUnset = (back) => {
      setTimeout(() => {
        setPending(false);
        if (back) setCheck(!!check);
      }, 1000);
    }
    if(check){
      removeMonitor(id,{
        url:rurl,
        clusterID,
        resolve() {
          delayUnset();
        },
        reject() {
          delayUnset(true);
        }
      })
    }else{
      createMonitor({},{
        url,
        clusterID,
        resolve() {
          delayUnset();
        },
        reject() {
          delayUnset(true);
        }
      })
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
            <CardHeader>
              <h4 className={classes.cardTitleWhite}>
                  <FormattedMessage {...messages.clusterMonitor} />
                </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <Switch
                    disabled={isPending}
                    inputProps={{
                      disabled: isPending
                    }}
                    onChange={handleChange()}
                    checked={check}
                    label={
                      <FormattedMessage
                        {...(isPending ? messages.pending : messages.open)}
                      />
                    }
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={()=>window.open(redirectUrl)}
                    disabled={!redirectUrl}
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
  monitors: makeSelectMonitors(),
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
