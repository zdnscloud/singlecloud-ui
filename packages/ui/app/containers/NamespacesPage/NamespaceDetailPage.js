/**
 *
 * NamespaceDetailPage
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Helmet from 'components/Helmet/Helmet';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import {
  makeSelectCurrentID as makeSelectCurrentNamespaceID,
  makeSelectURL,
} from 'ducks/namespaces/selectors';
import {
  makeSelectResourceQuotas,
  makeSelectURL as makeSelectResourceQuotasURL,
} from 'ducks/resourceQuotas/selectors';
import * as actions from 'ducks/namespaces/actions';
import * as rqActions from 'ducks/resourceQuotas/actions';

import ResourceQuota from './ResourceQuota';
import messages from './messages';
import useStyles from './styles';

export const NamespaceDetailPage = ({
  clusterID,
  namespaceID,
  url,
  readNamespace,
  resourceQuotasUrl,
  readResourceQuota,
  resourceQuotas,
}) => {
  const classes = useStyles();
  const resourceQuota = resourceQuotas.get(namespaceID) || resourceQuotas.clear();
  useEffect(() => {
    (async () => {
      await new Promise((resolve, reject) => {
        readNamespace(namespaceID, {
          url: `${url}/${namespaceID}`,
          clusterID,
          resolve,
          reject,
        });
      });
      readResourceQuota(namespaceID, {
        url: `${resourceQuotasUrl}/${namespaceID}`,
        clusterID,
        namespaceID,
      });
    })();
  }, [clusterID, namespaceID, resourceQuotasUrl, url, readNamespace, readResourceQuota]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.namespaceDetail} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.detail} />
                </h4>
              </CardHeader>
              <CardBody>
                <ResourceQuota resourceQuota={resourceQuota} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  url: makeSelectURL(),
  resourceQuotasUrl: makeSelectResourceQuotasURL(),
  resourceQuotas: makeSelectResourceQuotas(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      ...rqActions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NamespaceDetailPage);
