/**
 *
 * IngressDetailPage
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
} from 'ducks/ingresses/selectors';

import * as actions from 'ducks/ingresses/actions';

import IngressRuleTable from './IngressRuleTable';
import messages from './messages';
import useStyles from './styles';

export const IngressDetailPage = ({
  clusterID,
  namespaceID,
  ingressID,
  ingress,
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
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/ingresses`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.ingressDetail} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4 className={classes.cardTitleWhite}>
                  <FormattedMessage {...messages.ingressDetail} />
                </h4>
              </CardHeader>
              <CardBody>
              <GridContainer style={{ margin: 0 }}>
                <GridItem xs={3} sm={3} md={3}>
                  <ReadOnlyInput
                    labelText={<FormattedMessage {...messages.formName} />}
                    value={ingress.get('name')}
                    fullWidth
                  />
                 </GridItem>
              </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

        <GridContainer className={classes.grid} style={{paddingTop:0}}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4 className={classes.cardTitleWhite}>
                  <FormattedMessage {...messages.configurationDetails} />
                </h4>
              </CardHeader>
              <CardBody>
                <IngressRuleTable ingress={ingress}/>
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
  ingress: makeSelectCurrent(),
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
)(IngressDetailPage);
